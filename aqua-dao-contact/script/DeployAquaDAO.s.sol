// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {AquaGovToken} from "../src/AquaGovToken.sol";
import {AquaDAOTreasury} from "../src/AquaDAOTreasury.sol";
import {AquaDAO} from "../src/AquaDAO.sol";

contract DeployAquaDAO is Script {
    string constant DEPLOYMENT_FILE = "deployment-summary.json";

    function run() external returns (AquaDAOTreasury, AquaGovToken, AquaDAO) {
        vm.startBroadcast();
        // 1. deploy treasury
        AquaDAOTreasury treasury = new AquaDAOTreasury();

        // 2. deploy governance token
        AquaGovToken governanceToken = new AquaGovToken(address(treasury));

        // 3. deploy AquaDAO
        AquaDAO aquaDAO = new AquaDAO(address(treasury), address(governanceToken));

        vm.stopBroadcast();

        // Deployment summary
        console2.log("====================== Deploying summary ========================");
        console2.log("AquaDAOTreasury deployed successfully.");
        console2.log("AquaDAOTreasury deployed at:", address(treasury));
        console2.log("AquaGovToken deployed successfully.");
        console2.log("AquaGovToken deployed at:", address(governanceToken));
        console2.log("AquaDAO deployed successfully.");
        console2.log("AquaDAO deployed at:", address(aquaDAO));
        console2.log("================================================================");

        _writeDeploymentSummaryToJson(address(treasury), address(governanceToken), address(aquaDAO));

        return (treasury, governanceToken, aquaDAO);
    }

    function _writeDeploymentSummaryToJson(address _treasury, address _governanceToken, address _aquaDAO) private {
        // Step 1: Check if file exists and Step 2: Remove it if exists
        if (vm.exists(DEPLOYMENT_FILE)) {
            vm.removeFile(DEPLOYMENT_FILE);
            console2.log("Existing deployment file removed.");
        }

        // Step 3: Create new JSON file with deployment summary
        string memory json = "deployment_summary";

        // Add deployment information to JSON
        vm.serializeString(json, "contract_name", "AquaDAOTreasury");
        vm.serializeAddress(json, "contract_address", _treasury);
        vm.serializeString(json, "-----------------", "----------------------");
        vm.serializeString(json, "contract_name", "AquaDAOToken");
        vm.serializeAddress(json, "contract_address", _governanceToken);
        vm.serializeString(json, "-----------------", "----------------------");
        vm.serializeString(json, "contract_name", "AquaDAO");
        vm.serializeAddress(json, "contract_address", _aquaDAO);
        vm.serializeString(json, "-----------------", "----------------------");
        vm.serializeUint(json, "deployment_timestamp", block.timestamp);
        vm.serializeUint(json, "block_number", block.number);
        vm.serializeUint(json, "chain_id", block.chainid);
        string memory finalJson = vm.serializeString(json, "status", "deployed_successfully");

        // Write JSON to file
        vm.writeFile(DEPLOYMENT_FILE, finalJson);
        console2.log("Deployment summary written to:", DEPLOYMENT_FILE);
    }
}
