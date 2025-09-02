// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {AquaDAO} from "../../src/AquaDAO.sol";
import {DeployAquaDAO} from "../../script/DeployAquaDAO.s.sol";

contract AquaDAOTest is Test {
    // ---------------------- State Variables ---------------------------------
    AquaDAO aquaDAO;
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    uint256 public initialUserBalance = 10 ether;

    // ------------------------ Events ----------------------------
    event ProposalCreated(uint256 id, string description, uint256 deadline);
    event Voted(uint256 proposalId, address voter, bool support);
    event ProposalExecuted(uint256 id);

    // ---------------------- Set Up ---------------------------------
    function setUp() public {
        DeployAquaDAO deployAquaDAO = new DeployAquaDAO();
        (,, aquaDAO) = deployAquaDAO.run();

        // fund users
        vm.deal(user1, initialUserBalance);
        vm.deal(user2, initialUserBalance);
    }

    // ------------------------ Modifiers ----------------------------

    /**
     * Modifier to create a proposal
     */
    modifier createProposal(address _creator) {
        string memory description = "Proposal 1: Increase budget for project X";
        uint256 proposalDuration = 3; // `createProposal` function covert this number to days (eg:- 3 -> 3 days)
        vm.startPrank(_creator);
        aquaDAO.createProposal(description, proposalDuration);
        vm.stopPrank();
        _;
    }

    // ------------------------ Tests for create proposal ---------------------------------

    /**
     * Test the creation of a proposal
     */
    function test_createProposal() public {
        string memory description = "Proposal 1: Increase budget for project X";
        uint256 proposalDuration = 3; // `createProposal` function covert this number to days (eg:- 3 -> 3 days)

        // check initial state
        assertEq(aquaDAO.getTotalProposalsCount(), 0);

        // create proposal
        vm.startPrank(user1);
        aquaDAO.createProposal(description, proposalDuration);
        vm.stopPrank();

        // check final state
        assertEq(aquaDAO.getTotalProposalsCount(), 1);
        AquaDAO.ProposalForDisplay memory proposal = aquaDAO.getProposalDetail(1); // Proposal IDs start from 1
        // check the details
        assertEq(proposal.id, 1);
        assertEq(proposal.proposer, address(user1));
        assertEq(proposal.description, description);
        assertEq(proposal.votesFor, 0);
        assertEq(proposal.votesAgainst, 0);
        assertEq(proposal.deadline, block.timestamp + (proposalDuration * 1 days));
        assertEq(proposal.executed, false);
        assertEq(proposal.isProposalHasPassed, false);

        // check if proposal has passed (this case should not pass)
        assertEq(aquaDAO.getIsProposalHasPassed(1), false);

        // check active proposals
        AquaDAO.ProposalForDisplay[] memory activeProposals = aquaDAO.getActiveProposals();
        assertEq(activeProposals.length, 1);
        // check executed proposals
        AquaDAO.ProposalForDisplay[] memory executedProposals = aquaDAO.getExecutedProposals();
        assertEq(executedProposals.length, 0);
        // check failed proposals
        AquaDAO.ProposalForDisplay[] memory failedProposals = aquaDAO.getFailedProposals();
        assertEq(failedProposals.length, 0);
    }

    /**
     * Test create proposal emit events
     */
    function test_createProposal_emitsEvents() public {
        string memory description = "Proposal 1: Increase budget for project X";
        uint256 proposalDuration = 3; // 3 days

        // Create proposal and check emitted events
        vm.expectEmit(true, true, true, true);
        emit ProposalCreated(1, description, block.timestamp + (proposalDuration * 1 days));
        vm.startPrank(user1);
        aquaDAO.createProposal(description, proposalDuration);
        vm.stopPrank();
    }

    // --------------------------------------- Tests for vote ---------------------------------------

    /**
     * Test voting on a proposal in support
     */
    function test_vote_by_support() public createProposal(user1) {
        vm.startPrank(user2);
        aquaDAO.vote(1, true);
        vm.stopPrank();

        // Check proposal details
        AquaDAO.ProposalForDisplay memory proposal = aquaDAO.getProposalDetail(1);
        assertEq(proposal.votesFor, 1);
        assertEq(proposal.votesAgainst, 0);

        // check if user2 has voted (check the mapping update with user address)
        assertEq(aquaDAO.getIsHasVoted(1, user2), true);
    }

    /**
     * Test voting on a proposal against
     */
    function test_vote_against() public createProposal(user1) {
        vm.startPrank(user2);
        aquaDAO.vote(1, false);
        vm.stopPrank();

        // Check proposal details
        AquaDAO.ProposalForDisplay memory proposal = aquaDAO.getProposalDetail(1);
        assertEq(proposal.votesFor, 0);
        assertEq(proposal.votesAgainst, 1);

        // check if user2 has voted (check the mapping update with user address)
        assertEq(aquaDAO.getIsHasVoted(1, user2), true);
    }

    /**
     * Test voting emits events
     */
    function test_vote_emitsEvents() public createProposal(user1) {
        vm.startPrank(user2);
        // Expect event
        vm.expectEmit(true, true, true, true);
        emit Voted(1, user2, true);
        // Vote
        aquaDAO.vote(1, true);
        vm.stopPrank();
    }
}
