// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Aqua Treasury
 * @author Kavinda Rathnayake
 * @notice This contract implements the Aqua Treasury.
 * @dev The AquaDAOTreasury contract is responsible for managing the funds of the Aqua DAO.
 * @dev This contract holds the funds of users paid when they buy the Aqua Governance Token.
 */
contract AquaDAOTreasury is Ownable {
    // ------------------------------------ Errors ----------------------------
    error NotEnoughETH();
    error ETHTransferFailed();

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Sends ETH from the treasury to a specified address.
     * @param _to The address to send ETH to.
     * @param _amount The amount of ETH to send.
     */
    function sendETH(address _to, uint256 _amount) external onlyOwner {
        if (address(this).balance < _amount) revert NotEnoughETH();
        (bool sent,) = payable(_to).call{value: _amount}("");
        if (!sent) revert ETHTransferFailed();
    }

    /**
     * @dev Fallback function to receive ETH.
     */
    receive() external payable {}
}
