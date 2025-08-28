// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {AquaGovToken} from "../../src/AquaGovToken.sol";
import {AquaDAOTreasury} from "../../src/AquaDAOTreasury.sol";

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
}
