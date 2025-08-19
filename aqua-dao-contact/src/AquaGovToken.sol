// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Aqua Governance Token
 * @author Kavinda Rathnayake
 * @notice This contract implements the Aqua Governance Token.
 * @dev The AquaGovToken contract is a basic implementation of a governance token for the Aqua DAO.
 * @dev It uses `OpenZeppelin` contracts for the ERC20 token standard.
 */
contract AquaGovToken is ERC20 {
    // ------------------------ Errors ------------------------------------------------------
    error NotEnoughETHSent(uint256 sent, uint256 required);

    // -------------------- state variables -----------------------------------------------------
    uint256 private constant MINT_PRICE = 1 wei;

    // -------------------- constructor ----------------------------------------------------------
    constructor() ERC20("Aqua Governance Token", "AQUA") {}

    // -------------------- External/Public functions ---------------------------------------------------

    /**
     * @notice Mint new Aqua Governance Tokens
     * @param _amount The amount of tokens to mint
     */
    function mint(uint256 _amount) external payable {
        // calculate the cost
        uint256 cost = _amount * MINT_PRICE;
        // check if enough ETH was sent
        if (msg.value < cost) {
            revert NotEnoughETHSent(msg.value, cost);
        }
        // mint the tokens
        _mint(msg.sender, _amount);
        // Send ETH to DAO Treasury (if set up)
    }

    // -------------------- View functions ---------------------------------------------------

    /**
     * @notice Get the mint price of Aqua Governance Tokens
     * @return The mint price in wei
     */
    function getMintPrice() external pure returns (uint256) {
        return MINT_PRICE;
    }
}
