// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {DeployAquaDAO} from "../../script/DeployAquaDAO.s.sol";
import {AquaGovToken} from "../../src/AquaGovToken.sol";

/**
 * @notice Helper contract that rejects all Ether transfers
 * This is used to test transfer failure scenarios
 */
contract RejectEther {
// This contract will reject all Ether transfers by not having a receive or fallback function
// It can send Ether but cannot receive it
}

contract AquaGovTokenTest is Test {
    // ---------------------- State Variables ---------------------------------
    AquaGovToken aquaGovToken;
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    uint256 public initialUserBalance = 10 ether;

    // ---------------------- Set Up ---------------------------------
    function setUp() public {
        // deploy AquaGov
        DeployAquaDAO deployAquaDAO = new DeployAquaDAO();
        // store the deployed AquaGovToken
        (, aquaGovToken,) = deployAquaDAO.run();
        // fund users
        vm.deal(user1, initialUserBalance);
        vm.deal(user2, initialUserBalance);
    }

    // ------------------------ Tests for mint tokens ---------------------------------

    /**
     * Tests the minting of tokens.
     */
    function test_mintTokens() public {
        uint256 mintAmount = 5; // number of tokens to mint
        uint256 mintCost = mintAmount * aquaGovToken.getMintPrice(); // cost to mint tokens

        // check initial balance
        assertEq(aquaGovToken.balanceOf(user1), 0);

        // mint tokens
        vm.prank(user1);
        aquaGovToken.mint{value: mintCost}(mintAmount);

        // check final balance
        assertEq(aquaGovToken.balanceOf(user1), mintAmount);
    }

    /**
     * Tests the minting of tokens with insufficient payment.
     */
    function test_mintTokens_with_insufficientPayment() public {
        uint256 mintAmount = 5; // number of tokens to mint
        uint256 insufficientPayment = (mintAmount * aquaGovToken.getMintPrice()) - 1; // insufficient payment

        // attempt to mint tokens with insufficient payment
        vm.prank(user1);
        vm.expectRevert(
            abi.encodeWithSelector(
                AquaGovToken.AquaGovToken__NotEnoughETHSent.selector,
                insufficientPayment,
                mintAmount * aquaGovToken.getMintPrice()
            )
        );
        aquaGovToken.mint{value: insufficientPayment}(mintAmount);
    }

    /**
     * Tests the treasury transfer failure scenario.
     * This test creates a governance token with a treasury that rejects ETH transfers.
     */
    function test_mintTokens_treasuryTransferFails() public {
        // Deploy a contract that rejects ETH transfers
        RejectEther rejectEther = new RejectEther();

        // Deploy a new governance token with the RejectEther contract as treasury
        AquaGovToken tokenWithRejectTreasury = new AquaGovToken(address(rejectEther));

        uint256 mintAmount = 5; // number of tokens to mint
        uint256 mintCost = mintAmount * tokenWithRejectTreasury.getMintPrice(); // cost to mint tokens

        // attempt to mint tokens - should fail because treasury rejects ETH
        vm.prank(user1);
        vm.expectRevert(AquaGovToken.AquaGovToken__TreasuryTransferFailed.selector);
        tokenWithRejectTreasury.mint{value: mintCost}(mintAmount);
    }
}
