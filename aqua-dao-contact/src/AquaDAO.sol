// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AquaDAOTreasury} from "./AquaDAOTreasury.sol";

/**
 * @title Aqua DAO
 * @author Kavinda Rathnayake
 * @notice This contract implements the Aqua DAO.
 * @dev The AquaDAO contract is the main entry point for interacting with the Aqua DAO.
 * @dev This contract implements the functionality of creating proposals, voting, and executing proposals.
 */
contract AquaDAO {
    // ------------------------ Errors ----------------------------
    error AquaDAO__ProposalDoesNotExist();
    error AquaDAO__VotingPeriodHasEnded();
    error AquaDAO__AlreadyVoted();
    error AquaDAO__AlreadyExecutedProposal();
    error AquaDAO__NotProposalOwner();

    // ------------------------ Events ----------------------------
    event ProposalCreated(uint256 id, string description, uint256 deadline);
    event Voted(uint256 proposalId, address voter, bool support);
    event ProposalExecuted(uint256 id);

    // ------------------------ State variables ----------------------------
    ERC20 private s_AquaGovToken; // Aqua Governance Token
    AquaDAOTreasury private s_treasury; // Aqua Governance Treasury
    uint256 private s_proposalCount; // Proposal count

    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
        bool executed;
        bool isProposalHasPassed; // Indicates if the proposal has passed
        mapping(address => bool) voted;
    } // proposal

    struct ProposalForDisplay {
        uint256 id; // proposal ID
        address proposer; // address of the proposer
        string description; // description of the proposal
        uint256 votesFor; // number of votes for the proposal
        uint256 votesAgainst; // number of votes against the proposal
        uint256 deadline; // deadline for voting
        bool executed; // whether the proposal has been executed
        bool isProposalHasPassed; // Indicates if the proposal has passed
    } // proposal for display in the UI

    mapping(uint256 => Proposal) public proposals; // proposal ID to Proposal mapping
    uint256[] private allProposals; // Array of all proposal IDs

    // ---------------------- Constructor ----------------------
    constructor(address _treasury, address _governanceToken) {
        // set the Aqua Governance Treasury
        s_treasury = AquaDAOTreasury(payable(_treasury));
        // set the Aqua Governance Token
        s_AquaGovToken = ERC20(_governanceToken);
    }

    // --------------------- Modifiers ---------------------

    /**
     * @dev Modifier to check if a proposal exists.
     * @param _proposalId The ID of the proposal to check.
     */
    modifier onlyExistingProposal(uint256 _proposalId) {
        if (_proposalId > s_proposalCount || _proposalId == 0) {
            revert AquaDAO__ProposalDoesNotExist();
        }
        _;
    }

    /**
     * @dev Modifier to check if the caller is the owner of the proposal.
     * @param _proposalId The ID of the proposal to check.
     */
    modifier onlyOwnerCanExecute(uint256 _proposalId) {
        address owner = proposals[_proposalId].proposer;
        if (msg.sender != owner) {
            revert AquaDAO__NotProposalOwner();
        }
        _;
    }

    // ---------------------- External/Public functions ----------------------

    /**
     * @dev Creates a new proposal.
     * @param _description The description of the proposal.
     * @param _duration The duration of the proposal in days (e.g. 7 -> 7 days).
     */
    function createProposal(string calldata _description, uint256 _duration) external {
        s_proposalCount++; // Increment proposal count

        // Create a new proposal
        Proposal storage newProposal = proposals[s_proposalCount];
        newProposal.id = s_proposalCount;
        newProposal.proposer = msg.sender;
        newProposal.description = _description;
        newProposal.deadline = block.timestamp + (_duration * 1 days);
        newProposal.executed = false;
        newProposal.isProposalHasPassed = false; // Initialize as not passed

        // Add the new proposal to the allProposals array
        allProposals.push(newProposal.id);

        // emit the ProposalCreated event
        emit ProposalCreated(s_proposalCount, _description, newProposal.deadline);
    }

    /**
     * @dev Votes on a proposal.
     * @param _proposalId The ID of the proposal to vote on.
     * @param _support Whether the vote is in support (true) or against (false) the proposal.
     */
    function vote(uint256 _proposalId, bool _support) external onlyExistingProposal(_proposalId) {
        // Get the proposal
        Proposal storage proposal = proposals[_proposalId];
        // Check if the proposal is active
        if (block.timestamp > proposal.deadline) {
            revert AquaDAO__VotingPeriodHasEnded();
        }
        // Check if the user has already voted
        if (proposal.voted[msg.sender]) {
            revert AquaDAO__AlreadyVoted();
        }

        // Record the vote
        proposal.voted[msg.sender] = true;
        if (_support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }

        // emit the Voted event
        emit Voted(_proposalId, msg.sender, _support);
    }

    /**
     * @dev Executes a proposal.
     * @param _proposalId The ID of the proposal to execute.
     */
    function executeTheProposal(uint256 _proposalId)
        external
        onlyExistingProposal(_proposalId)
        onlyOwnerCanExecute(_proposalId)
    {
        // Get the proposal
        Proposal storage proposal = proposals[_proposalId];
        // Check if the proposal has already been executed
        if (proposal.executed) {
            revert AquaDAO__AlreadyExecutedProposal();
        }

        // Mark the proposal as executed
        proposal.executed = true;
        // Check if the proposal has passed
        if (proposal.votesFor > proposal.votesAgainst) {
            proposal.isProposalHasPassed = true;
        }

        // emit the ProposalExecuted event
        emit ProposalExecuted(_proposalId);
    }

    // ------------------------------------ View functions --------------------------------

    /**
     * @dev Returns the details of a specific proposal.
     * @param _proposalId The ID of the proposal to retrieve.
     */
    function getProposalDetail(uint256 _proposalId)
        external
        view
        onlyExistingProposal(_proposalId)
        returns (ProposalForDisplay memory)
    {
        Proposal storage proposal = proposals[_proposalId];
        return ProposalForDisplay({
            id: proposal.id,
            proposer: proposal.proposer,
            description: proposal.description,
            votesFor: proposal.votesFor,
            votesAgainst: proposal.votesAgainst,
            deadline: proposal.deadline,
            executed: proposal.executed,
            isProposalHasPassed: proposal.isProposalHasPassed
        });
    }

    function getIsHasVoted(uint256 _proposalId, address _voter)
        external
        view
        onlyExistingProposal(_proposalId)
        returns (bool)
    {
        return proposals[_proposalId].voted[_voter];
    }

    /**
     * @dev Returns whether a specific proposal has passed.
     * @param _proposalId The ID of the proposal to check.
     */
    function getIsProposalHasPassed(uint256 _proposalId)
        external
        view
        onlyExistingProposal(_proposalId)
        returns (bool)
    {
        return proposals[_proposalId].isProposalHasPassed;
    }

    /**
     * @dev Returns the total number of proposals.
     * @return The total number of proposals.
     */
    function getTotalProposalsCount() external view returns (uint256) {
        return allProposals.length;
    }

    /**
     * @dev Returns an array of active proposals.
     */
    function getActiveProposals() external view returns (ProposalForDisplay[] memory) {
        return _getActiveProposals();
    }

    /**
     * @dev Returns an array of executed proposals.
     */
    function getExecutedProposals() external view returns (ProposalForDisplay[] memory) {
        return _getExecutedProposals();
    }

    /**
     * @dev Returns an array of failed proposals.
     */
    function getFailedProposals() external view returns (ProposalForDisplay[] memory) {
        return _getFailedProposals();
    }

    // ----------------------------------- internal functions -------------------------------

    /**
     * @dev Returns an array of active proposals.
     */
    function _getActiveProposals() internal view returns (ProposalForDisplay[] memory) {
        // First, count the number of active proposals
        uint256 activeCount = 0;
        for (uint256 i = 0; i < allProposals.length; i++) {
            if (proposals[allProposals[i]].deadline > block.timestamp && !proposals[allProposals[i]].executed) {
                activeCount++;
            }
        }

        // Create the active proposals array with the correct size
        ProposalForDisplay[] memory activeProposals = new ProposalForDisplay[](activeCount);
        uint256 index = 0;

        for (uint256 i = 0; i < allProposals.length; i++) {
            if (proposals[allProposals[i]].deadline > block.timestamp && !proposals[allProposals[i]].executed) {
                activeProposals[index] = ProposalForDisplay({
                    id: proposals[allProposals[i]].id,
                    proposer: proposals[allProposals[i]].proposer,
                    description: proposals[allProposals[i]].description,
                    votesFor: proposals[allProposals[i]].votesFor,
                    votesAgainst: proposals[allProposals[i]].votesAgainst,
                    deadline: proposals[allProposals[i]].deadline,
                    executed: proposals[allProposals[i]].executed,
                    isProposalHasPassed: proposals[allProposals[i]].isProposalHasPassed
                });
                index++;
            }
        }
        return activeProposals;
    }

    /**
     * @dev Returns an array of executed proposals.
     */
    function _getExecutedProposals() internal view returns (ProposalForDisplay[] memory) {
        // First, count the number of executed proposals
        uint256 executedCount = 0;
        for (uint256 i = 0; i < allProposals.length; i++) {
            if (proposals[allProposals[i]].executed) {
                executedCount++;
            }
        }

        // Create the executed proposals array with the correct size
        ProposalForDisplay[] memory executedProposals = new ProposalForDisplay[](executedCount);
        uint256 index = 0;

        for (uint256 i = 0; i < allProposals.length; i++) {
            if (proposals[allProposals[i]].executed) {
                executedProposals[index] = ProposalForDisplay({
                    id: proposals[allProposals[i]].id,
                    proposer: proposals[allProposals[i]].proposer,
                    description: proposals[allProposals[i]].description,
                    votesFor: proposals[allProposals[i]].votesFor,
                    votesAgainst: proposals[allProposals[i]].votesAgainst,
                    deadline: proposals[allProposals[i]].deadline,
                    executed: proposals[allProposals[i]].executed,
                    isProposalHasPassed: proposals[allProposals[i]].isProposalHasPassed
                });
                index++;
            }
        }
        return executedProposals;
    }

    /**
     * @dev Returns an array of failed proposals (deadline has passed and not executed).
     */
    function _getFailedProposals() internal view returns (ProposalForDisplay[] memory) {
        // First, count the number of failed proposals
        uint256 failedCount = 0;
        for (uint256 i = 0; i < allProposals.length; i++) {
            if (proposals[allProposals[i]].deadline <= block.timestamp && !proposals[allProposals[i]].executed) {
                failedCount++;
            }
        }

        // Create the failed proposals array with the correct size
        ProposalForDisplay[] memory failedProposals = new ProposalForDisplay[](failedCount);
        uint256 index = 0;

        for (uint256 i = 0; i < allProposals.length; i++) {
            if (proposals[allProposals[i]].deadline <= block.timestamp && !proposals[allProposals[i]].executed) {
                failedProposals[index] = ProposalForDisplay({
                    id: proposals[allProposals[i]].id,
                    proposer: proposals[allProposals[i]].proposer,
                    description: proposals[allProposals[i]].description,
                    votesFor: proposals[allProposals[i]].votesFor,
                    votesAgainst: proposals[allProposals[i]].votesAgainst,
                    deadline: proposals[allProposals[i]].deadline,
                    executed: proposals[allProposals[i]].executed,
                    isProposalHasPassed: proposals[allProposals[i]].isProposalHasPassed
                });
                index++;
            }
        }
        return failedProposals;
    }
}
