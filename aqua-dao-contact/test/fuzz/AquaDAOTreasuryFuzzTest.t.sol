// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
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

contract AquaDAOTreasuryFuzzTest is Test {
    // ---------------------- State Variables ---------------------------------
    AquaDAOTreasury aquaDAOTreasury;
    AquaGovToken aquaGovToken;

    // ---------------------- Set Up ---------------------------------
    function setUp() public {
        vm.startBroadcast();
        // 1. deploy treasury
        aquaDAOTreasury = new AquaDAOTreasury();

        // 2. deploy governance token
        aquaGovToken = new AquaGovToken(address(aquaDAOTreasury));

        vm.stopBroadcast();
    }

    // ------------------------ Fuzz Tests for treasury ---------------------------------

    /**
     * @dev Fuzz test for minting tokens and increasing treasury balance
     * @param _user The address of the user
     * @param _amount The amount of tokens to mint
     */
    function test_fuzz_tokenMintIncreaseTreasuryBalance(address _user, uint256 _amount) public {
        // setup
        vm.assume(_user != address(0)); // avoid zero address
        _amount = bound(_amount, 1, 100); // limit the amount to a reasonable range
        uint256 mintCost = _amount * aquaGovToken.getMintPrice(); // cost to mint tokens
        vm.deal(_user, mintCost + 1 ether); // fund user with enough Ether to cover minting cost

        // check initial treasury balance
        assertEq(address(aquaDAOTreasury).balance, 0);

        // mint tokens
        vm.startPrank(_user);
        aquaGovToken.mint{value: mintCost}(_amount);

        // check final treasury balance
        assertEq(address(aquaDAOTreasury).balance, mintCost);
        vm.stopPrank();
    }

    /**
     * Fuzz Tests the ability of the owner to send ETH from the treasury.
     * @param _recipient The address of the recipient
     * @param _user The address of the user
     * @param _mintAmount The amount of tokens to mint
     */
    function test_fuzz_sendEth_by_owner(address _recipient, address _user, uint256 _mintAmount) public {
        address owner = aquaDAOTreasury.owner();
        // setup
        vm.assume(_user != address(0)); // avoid zero address
        vm.assume(_recipient != address(0)); // avoid zero address
        vm.assume(_user != owner); // avoid user being the owner
        vm.assume(_recipient != owner); // avoid recipient being the owner
        vm.assume(_user != _recipient); // avoid user being the recipient

        // Filter out problematic addresses that can't receive ETH
        vm.assume(uint160(_recipient) > 0x1000); // avoid very low addresses including precompiles
        vm.assume(_recipient != address(aquaDAOTreasury)); // avoid treasury contract
        vm.assume(_recipient != address(aquaGovToken)); // avoid token contract
        vm.assume(_recipient.code.length == 0); // only send to EOAs (Externally Owned Accounts)

        // Use a fixed user address to avoid complications
        address testUser = address(0x1234567890123456789012345678901234567890);
        vm.assume(testUser != _recipient);

        _mintAmount = bound(_mintAmount, 1, 100); // limit the amount to a reasonable range
        uint256 mintCost = _mintAmount * aquaGovToken.getMintPrice(); // cost to mint tokens
        uint256 sendAmount = mintCost / 2;

        // mint tokens
        vm.deal(testUser, mintCost + 1 ether); // fund user with enough Ether to cover minting cost
        vm.startPrank(testUser);
        aquaGovToken.mint{value: mintCost}(_mintAmount);
        vm.stopPrank();

        // check recipient balance
        uint256 initialRecipientBalance = _recipient.balance;

        // send eth to recipient
        vm.startPrank(owner);
        aquaDAOTreasury.sendETH(_recipient, sendAmount);
        vm.stopPrank();

        // check final balances
        assertEq(address(aquaDAOTreasury).balance, mintCost - sendAmount);
        assertEq(_recipient.balance, initialRecipientBalance + sendAmount);
    }

    /**
     * Fuzz Tests the ability of a non-owner to send ETH from the treasury.
     * @param _user1 The address of the user
     * @param _nonOwner The address of the non-owner
     * @param _recipient The address of the recipient
     * @param _mintAmount The amount of tokens to mint
     */
    function test_fuzz_sendEth_by_non_owner_fails(
        address _user1,
        address _nonOwner,
        address _recipient,
        uint256 _mintAmount
    ) public {
        // setup
        vm.assume(_user1 != address(0)); // avoid zero address
        vm.assume(_nonOwner != address(0)); // avoid zero address
        vm.assume(_recipient != address(0)); // avoid zero address
        _mintAmount = bound(_mintAmount, 1, 100); // limit the amount to a reasonable range
        uint256 mintCost = _mintAmount * aquaGovToken.getMintPrice();
        uint256 sendAmount = mintCost / 2;

        // mint tokens
        vm.deal(_user1, mintCost + 1 ether); // fund user with enough Ether to cover minting cost
        vm.startPrank(_user1);
        aquaGovToken.mint{value: mintCost}(_mintAmount);
        vm.stopPrank();

        // attempt to send eth to recipient by non-owner
        vm.startPrank(_nonOwner);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, _nonOwner));
        aquaDAOTreasury.sendETH(_recipient, sendAmount);
        vm.stopPrank();
    }

    /**
     * Fuzz Tests the ability of the owner to send ETH from the treasury.
     * This test ensures that the owner can not send ETH if the treasury is empty or has insufficient funds.
     * @param _recipient The address of the recipient
     * @param _sendAmount The amount of ETH to send
     */
    function test_fuzz_notEnoughEthInTreasury_fails(address _recipient, uint256 _sendAmount) public {
        vm.assume(_recipient != address(0)); // avoid zero address
        _sendAmount = bound(_sendAmount, 1, 100); // limit the amount to a reasonable range
        address owner = aquaDAOTreasury.owner();

        // attempt to send eth to recipient by owner
        vm.startPrank(owner);
        vm.expectRevert(abi.encodeWithSelector(AquaDAOTreasury.AquaDAOTreasury__NotEnoughETH.selector));
        aquaDAOTreasury.sendETH(_recipient, _sendAmount);
        vm.stopPrank();
    }

    /**
     * Fuzz Tests the ability of the owner to send ETH from the treasury.
     * This test creates a recipient that rejects ETH transfers to test the failure scenario.
     * @param _user The address of the user
     * @param _mintAmount The amount of tokens to mint
     */
    function test_fuzz_rejectEthTransferToRecipient_fails(address _user, uint256 _mintAmount) public {
        vm.assume(_user != address(0)); // avoid zero address
        _mintAmount = bound(_mintAmount, 1, 100); // limit the amount to a reasonable range
        address owner = aquaDAOTreasury.owner();
        RejectEther rejectEther = new RejectEther(); // recipient that rejects ETH transfers
        uint256 mintCost = _mintAmount * aquaGovToken.getMintPrice();
        uint256 sendAmount = mintCost / 2;

        // mint tokens
        vm.deal(_user, mintCost + 1 ether); // fund user with enough Ether to cover minting cost
        vm.startPrank(_user);
        aquaGovToken.mint{value: mintCost}(_mintAmount);
        vm.stopPrank();

        // attempt to send eth to recipient that rejects ETH transfers
        vm.startPrank(owner);
        vm.expectRevert(AquaDAOTreasury.AquaDAOTreasury__ETHTransferFailed.selector);
        aquaDAOTreasury.sendETH(address(rejectEther), sendAmount);
        vm.stopPrank();
    }
}
