// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {AquaGovToken} from "../../src/AquaGovToken.sol";
import {AquaDAOTreasury} from "../../src/AquaDAOTreasury.sol";

contract AquaGovTokenFuzzTest is Test {
    // ---------------------- State Variables ---------------------------------
    AquaGovToken aquaGovToken;

    // ---------------------- Set Up ---------------------------------
    function setUp() public {
        vm.startBroadcast();
        // 1. deploy treasury
        AquaDAOTreasury treasury = new AquaDAOTreasury();

        // 2. deploy governance token
        aquaGovToken = new AquaGovToken(address(treasury));

        vm.stopBroadcast();
    }

    // ------------------------ Fuzz Tests for mint tokens ---------------------------------

    /**
     * @dev Fuzz test for minting tokens
     * @param _user The address of the user minting tokens
     * @param _amount The amount of tokens to mint
     */
    function test_fuzz_mintTokens(address _user, uint256 _amount) public {
        // setup
        vm.assume(_user != address(0)); // avoid zero address
        _amount = bound(_amount, 1, 100); // limit the amount to a reasonable range
        uint256 mintCost = _amount * aquaGovToken.getMintPrice(); // cost to mint tokens
        vm.deal(_user, mintCost + 1 ether); // fund user with enough Ether to cover minting cost

        vm.startPrank(_user);
        // check initial balance
        assertEq(aquaGovToken.balanceOf(_user), 0);

        // mint tokens
        aquaGovToken.mint{value: mintCost}(_amount);

        // check final balance
        assertEq(aquaGovToken.balanceOf(_user), _amount);
        vm.stopPrank();
    }

    /**
     * @dev Fuzz test for minting tokens with insufficient payment
     * @param _user The address of the user minting tokens
     * @param _amount The amount of tokens to mint
     */
    function test_fuzz_mintTokens_with_insufficientPayment(address _user, uint256 _amount) public {
        // setup
        vm.assume(_user != address(0)); // avoid zero address
        _amount = bound(_amount, 1, 100); // limit the amount to a reasonable range
        uint256 insufficientPayment = _amount * aquaGovToken.getMintPrice() - 1; // insufficient payment
        vm.deal(_user, _amount * 1 ether + 1 ether); // fund user with Ether

        // attempt to mint tokens with insufficient payment
        vm.startPrank(_user);
        vm.expectRevert(
            abi.encodeWithSelector(
                AquaGovToken.AquaGovToken__NotEnoughETHSent.selector,
                insufficientPayment,
                _amount * aquaGovToken.getMintPrice()
            )
        );
        aquaGovToken.mint{value: insufficientPayment}(_amount);
        vm.stopPrank();
    }
}
