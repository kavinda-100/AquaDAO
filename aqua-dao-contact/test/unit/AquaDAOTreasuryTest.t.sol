// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {DeployAquaDAO} from "../../script/DeployAquaDAO.s.sol";
import {AquaGovToken} from "../../src/AquaGovToken.sol";
import {AquaDAOTreasury} from "../../src/AquaDAOTreasury.sol";

contract AquaDAOTreasuryTest is Test {
    // ---------------------- State Variables ---------------------------------
    AquaDAOTreasury aquaDAOTreasury;
    AquaGovToken aquaGovToken;
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    uint256 public initialUserBalance = 10 ether;

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
}
