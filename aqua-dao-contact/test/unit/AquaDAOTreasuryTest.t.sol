// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {DeployAquaDAO} from "../../script/DeployAquaDAO.s.sol";
import {AquaGovToken} from "../../src/AquaGovToken.sol";
import {AquaDAOTreasury} from "../../src/AquaDAOTreasury.sol";

/**
 * @notice Helper contract that rejects all Ether transfers
 * This is used to test transfer failure scenarios
 */
contract RejectEther {
// This contract will reject all Ether transfers by not having a receive or fallback function
// It can send Ether but cannot receive it
}

contract AquaDAOTreasuryTest is Test {
    // ---------------------- State Variables ---------------------------------
    AquaDAOTreasury aquaDAOTreasury;
    AquaGovToken aquaGovToken;
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    uint256 public initialUserBalance = 10 ether;

    // ------------------------------------ Events ----------------------------
    event ETHSent(address indexed to, uint256 amount);

    // ---------------------- Set Up ---------------------------------
    function setUp() public {
        // deploy AquaGov
        DeployAquaDAO deployAquaDAO = new DeployAquaDAO();
        // store the deployed AquaDAOTreasury
        (aquaDAOTreasury, aquaGovToken,) = deployAquaDAO.run();
        // fund users
        vm.deal(user1, initialUserBalance);
        vm.deal(user2, initialUserBalance);
    }

    // ------------------------ Tests for deposit Ether ---------------------------------

    /**
     * Tests to see whether token minting increases the treasury balance.
     */
    function test_tokenMintIncreaseTreasuryBalance() public {
        uint256 mintAmount = 5;
        uint256 mintCost = mintAmount * aquaGovToken.getMintPrice();

        // check initial treasury balance
        assertEq(address(aquaDAOTreasury).balance, 0);

        // mint tokens
        vm.prank(user1);
        aquaGovToken.mint{value: mintCost}(mintAmount);

        // check final treasury balance
        assertEq(address(aquaDAOTreasury).balance, mintCost);
    }

    /**
     * Tests the ability of the owner to send ETH from the treasury.
     */
    function test_sendEth_by_owner() public {
        address owner = aquaDAOTreasury.owner();
        address recipient = makeAddr("recipient");
        uint256 mintAmount = 5;
        uint256 mintCost = mintAmount * aquaGovToken.getMintPrice();
        uint256 sendAmount = mintCost / 2;

        // mint tokens
        vm.startPrank(user1);
        aquaGovToken.mint{value: mintCost}(mintAmount);
        vm.stopPrank();

        // check recipient balance
        assertEq(recipient.balance, 0);

        // send eth to recipient
        vm.startPrank(owner);
        aquaDAOTreasury.sendETH(recipient, sendAmount);
        vm.stopPrank();

        // check final balances
        assertEq(address(aquaDAOTreasury).balance, mintCost - sendAmount);
        assertEq(recipient.balance, sendAmount);
    }

    /**
     * Tests that sending ETH from the treasury by a non-owner fails.
     */
    function test_sendEth_by_non_owner_fails() public {
        address nonOwner = user2;
        address recipient = makeAddr("recipient");
        uint256 mintAmount = 5;
        uint256 mintCost = mintAmount * aquaGovToken.getMintPrice();
        uint256 sendAmount = mintCost / 2;

        // mint tokens
        vm.startPrank(user1);
        aquaGovToken.mint{value: mintCost}(mintAmount);
        vm.stopPrank();

        // attempt to send eth to recipient by non-owner
        vm.startPrank(nonOwner);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, nonOwner));
        aquaDAOTreasury.sendETH(recipient, sendAmount);
        vm.stopPrank();
    }

    /**
     * Tests the ability emit an event when ETH is sent from the treasury.
     */
    function test_sendEth_emit_event() public {
        address owner = aquaDAOTreasury.owner();
        address recipient = makeAddr("recipient");
        uint256 mintAmount = 5;
        uint256 mintCost = mintAmount * aquaGovToken.getMintPrice();
        uint256 sendAmount = mintCost / 2;

        // mint tokens
        vm.startPrank(user1);
        aquaGovToken.mint{value: mintCost}(mintAmount);
        vm.stopPrank();

        // expect event to be emitted
        vm.expectEmit(true, true, true, true);
        emit ETHSent(recipient, sendAmount);

        // send eth to recipient
        vm.startPrank(owner);
        aquaDAOTreasury.sendETH(recipient, sendAmount);
        vm.stopPrank();
    }

    /**
     * Tests that sending ETH from the treasury fails when there is not enough ETH.
     */
    function test_notEnoughEthInTreasury_fails() public {
        address owner = aquaDAOTreasury.owner();
        address recipient = makeAddr("recipient");
        uint256 sendAmount = 1 ether; // trying to send 1 ether from an empty treasury

        // attempt to send eth to recipient by owner
        vm.startPrank(owner);
        vm.expectRevert(abi.encodeWithSelector(AquaDAOTreasury.AquaDAOTreasury__NotEnoughETH.selector));
        aquaDAOTreasury.sendETH(recipient, sendAmount);
        vm.stopPrank();
    }

    /**
     * Tests that sending ETH to a recipient that rejects ETH transfers fails.
     */
    function test_rejectEthTransferToRecipient_fails() public {
        address owner = aquaDAOTreasury.owner();
        RejectEther rejectEther = new RejectEther(); // recipient that rejects ETH transfers
        uint256 mintAmount = 5;
        uint256 mintCost = mintAmount * aquaGovToken.getMintPrice();
        uint256 sendAmount = mintCost / 2;

        // mint tokens
        vm.startPrank(user1);
        aquaGovToken.mint{value: mintCost}(mintAmount);
        vm.stopPrank();

        // attempt to send eth to recipient that rejects ETH transfers
        vm.startPrank(owner);
        vm.expectRevert(AquaDAOTreasury.AquaDAOTreasury__ETHTransferFailed.selector);
        aquaDAOTreasury.sendETH(address(rejectEther), sendAmount);
        vm.stopPrank();
    }
}
