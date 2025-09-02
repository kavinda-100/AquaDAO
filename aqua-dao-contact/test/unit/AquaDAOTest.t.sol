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

    /**
     * Modifier to vote for a proposal by multiple users
     * @param _rounds Number of users to vote
     */
    modifier voteFor(uint256 _rounds) {
        for (uint256 i = 0; i < _rounds; i++) {
            address user = makeAddr(string(abi.encodePacked("voter_for", vm.toString(i))));
            vm.deal(user, initialUserBalance);
            vm.startPrank(user);
            aquaDAO.vote(1, true); // assuming the returning proposal ID is `1` from the `createProposal` function
            vm.stopPrank();
        }
        _;
    }

    /**
     * Modifier to vote for a proposal by multiple users
     * @param _rounds Number of users to vote
     */
    modifier voteAgainst(uint256 _rounds) {
        for (uint256 i = 0; i < _rounds; i++) {
            address user = makeAddr(string(abi.encodePacked("voter_against", vm.toString(i))));
            vm.deal(user, initialUserBalance);
            vm.startPrank(user);
            aquaDAO.vote(1, false); // assuming the returning proposal ID is `1` from the `createProposal` function
            vm.stopPrank();
        }
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

    /**
     * Test that a user cannot vote twice on the same proposal
     */
    function test_can_not_vote_twice() public createProposal(user1) {
        vm.startPrank(user2);
        // First vote
        aquaDAO.vote(1, true);

        // Attempt to vote again
        vm.expectRevert(AquaDAO.AquaDAO__AlreadyVoted.selector);
        aquaDAO.vote(1, false);
        vm.stopPrank();
    }

    /**
     * Test voting after the voting period has ended
     */
    function test_can_not_vote_if_the_voting_period_has_ended() public createProposal(user1) {
        // Fast forward time to after the proposal deadline
        vm.warp(block.timestamp + 4 days); // assuming the proposal duration was 3 days (in the `createProposal` modifier)

        vm.startPrank(user2);
        // Attempt to vote after the deadline
        vm.expectRevert(AquaDAO.AquaDAO__VotingPeriodHasEnded.selector);
        aquaDAO.vote(1, true);
        vm.stopPrank();
    }

    /**
     * Test voting on a non-existent proposal
     */
    function test_can_not_vote_if_proposal_does_not_exist() public {
        vm.startPrank(user2);
        // Attempt to vote on a non-existent proposal
        vm.expectRevert(AquaDAO.AquaDAO__ProposalDoesNotExist.selector);
        aquaDAO.vote(999, true); // Assuming proposal ID 999 does not exist
        vm.stopPrank();
    }

    // ----------------------------------------- execute proposal tests -----------------------------------------

    /**
     * Test executing a proposal successfully after voting
     */
    function test_execute_the_proposal_successfully()
        public
        createProposal(user1)
        voteFor(6) // 6 votes for
        voteAgainst(3) // 3 votes against
    {
        // Execute the proposal
        vm.startPrank(user1); // assuming user1 is the proposer and can execute
        aquaDAO.executeTheProposal(1);
        vm.stopPrank();

        // Check proposal details
        AquaDAO.ProposalForDisplay memory proposal = aquaDAO.getProposalDetail(1);
        assertEq(proposal.executed, true);
        assertEq(proposal.isProposalHasPassed, true);
        assertEq(proposal.votesFor, 6);
        assertEq(proposal.votesAgainst, 3);

        // Check executed proposals
        AquaDAO.ProposalForDisplay[] memory executedProposals = aquaDAO.getExecutedProposals();
        assertEq(executedProposals.length, 1);
        assertEq(executedProposals[0].id, 1);

        // Check active proposals
        AquaDAO.ProposalForDisplay[] memory activeProposals = aquaDAO.getActiveProposals();
        assertEq(activeProposals.length, 0);

        // Check failed proposals
        AquaDAO.ProposalForDisplay[] memory failedProposals = aquaDAO.getFailedProposals();
        assertEq(failedProposals.length, 0);
    }

    /**
     * Test executing a proposal emits events
     */
    function test_execute_proposal_emits_events()
        public
        createProposal(user1)
        voteFor(5) // 5 votes for
        voteAgainst(2) // 2 votes against
    {
        // Expect event
        vm.expectEmit(true, true, true, true);
        emit ProposalExecuted(1);

        // Execute the proposal
        vm.startPrank(user1); // assuming user1 is the proposer and can execute
        aquaDAO.executeTheProposal(1);
        vm.stopPrank();
    }

    /**
     * Test that a user cannot execute a proposal that has already been executed
     */
    function test_can_not_execute_if_already_executed()
        public
        createProposal(user1)
        voteFor(5) // 5 votes for
        voteAgainst(2) // 2 votes against
    {
        // Execute the proposal first time
        vm.startPrank(user1); // assuming user1 is the proposer and can execute
        aquaDAO.executeTheProposal(1);
        vm.stopPrank();

        // Attempt to execute the proposal again
        vm.startPrank(user1);
        vm.expectRevert(AquaDAO.AquaDAO__AlreadyExecutedProposal.selector);
        aquaDAO.executeTheProposal(1);
        vm.stopPrank();
    }

    /**
     * Test that a user cannot execute a proposal that does not exist
     */
    function test_can_not_execute_if_proposal_does_not_exist() public {
        vm.startPrank(user1);
        // Attempt to execute a non-existent proposal
        vm.expectRevert(AquaDAO.AquaDAO__ProposalDoesNotExist.selector);
        aquaDAO.executeTheProposal(999); // Assuming proposal ID 999 does not exist
        vm.stopPrank();
    }

    /**
     * Test that only the owner of the proposal can execute it
     */
    function test_only_owner_can_execute_the_proposal()
        public
        createProposal(user1)
        voteFor(5) // 5 votes for
        voteAgainst(2) // 2 votes against
    {
        // Attempt to execute the proposal by a non-owner
        vm.startPrank(user2); // user2 is not the proposer
        vm.expectRevert(AquaDAO.AquaDAO__NotProposalOwner.selector);
        aquaDAO.executeTheProposal(1);
        vm.stopPrank();
    }

    /**
     * Test executing a proposal where votes against are greater than votes for
     */
    function test_execute_proposal_with_more_votes_against()
        public
        createProposal(user1)
        voteFor(2) // 2 votes for
        voteAgainst(5) // 5 votes against
    {
        // Execute the proposal
        vm.startPrank(user1);
        aquaDAO.executeTheProposal(1);
        vm.stopPrank();

        // Check proposal details - should be executed but not passed
        AquaDAO.ProposalForDisplay memory proposal = aquaDAO.getProposalDetail(1);
        assertEq(proposal.executed, true);
        assertEq(proposal.isProposalHasPassed, false); // Should not pass because more votes against
        assertEq(proposal.votesFor, 2);
        assertEq(proposal.votesAgainst, 5);

        // Check it shows up in executed proposals
        AquaDAO.ProposalForDisplay[] memory executedProposals = aquaDAO.getExecutedProposals();
        assertEq(executedProposals.length, 1);
    }

    /**
     * Test executing a proposal with equal votes for and against
     */
    function test_execute_proposal_with_equal_votes()
        public
        createProposal(user1)
        voteFor(3) // 3 votes for
        voteAgainst(3) // 3 votes against
    {
        // Execute the proposal
        vm.startPrank(user1);
        aquaDAO.executeTheProposal(1);
        vm.stopPrank();

        // Check proposal details - should be executed but not passed (equal votes = not passed)
        AquaDAO.ProposalForDisplay memory proposal = aquaDAO.getProposalDetail(1);
        assertEq(proposal.executed, true);
        assertEq(proposal.isProposalHasPassed, false); // Equal votes should not pass
        assertEq(proposal.votesFor, 3);
        assertEq(proposal.votesAgainst, 3);
    }

    /**
     * Test getIsHasVoted function with users who haven't voted
     */
    function test_getIsHasVoted_false() public createProposal(user1) {
        // Check that user2 hasn't voted initially
        assertEq(aquaDAO.getIsHasVoted(1, user2), false);

        // Vote with user2
        vm.startPrank(user2);
        aquaDAO.vote(1, true);
        vm.stopPrank();

        // Check that user2 has now voted
        assertEq(aquaDAO.getIsHasVoted(1, user2), true);

        // Check that user1 (who created the proposal) still hasn't voted
        assertEq(aquaDAO.getIsHasVoted(1, user1), false);
    }

    /**
     * Test getIsHasVoted with non-existent proposal
     */
    function test_getIsHasVoted_nonexistent_proposal() public {
        vm.expectRevert(AquaDAO.AquaDAO__ProposalDoesNotExist.selector);
        aquaDAO.getIsHasVoted(999, user1);
    }

    /**
     * Test failed proposals function - proposals that have expired without being executed
     */
    function test_getFailedProposals() public createProposal(user1) {
        // Initially no failed proposals
        AquaDAO.ProposalForDisplay[] memory failedProposals = aquaDAO.getFailedProposals();
        assertEq(failedProposals.length, 0);

        // Fast forward past the deadline
        vm.warp(block.timestamp + 4 days);

        // Now should have 1 failed proposal
        failedProposals = aquaDAO.getFailedProposals();
        assertEq(failedProposals.length, 1);
        assertEq(failedProposals[0].id, 1);
        assertEq(failedProposals[0].executed, false);

        // Active proposals should be 0
        AquaDAO.ProposalForDisplay[] memory activeProposals = aquaDAO.getActiveProposals();
        assertEq(activeProposals.length, 0);

        // Executed proposals should be 0
        AquaDAO.ProposalForDisplay[] memory executedProposals = aquaDAO.getExecutedProposals();
        assertEq(executedProposals.length, 0);
    }

    /**
     * Test multiple proposals with different states
     */
    function test_multiple_proposals_different_states() public {
        // Create first proposal
        vm.startPrank(user1);
        aquaDAO.createProposal("Proposal 1", 3);
        vm.stopPrank();

        // Create second proposal
        vm.startPrank(user2);
        aquaDAO.createProposal("Proposal 2", 5);
        vm.stopPrank();

        // Vote on first proposal
        address voter1 = makeAddr("voter1");
        vm.startPrank(voter1);
        aquaDAO.vote(1, true);
        vm.stopPrank();

        // Execute first proposal
        vm.startPrank(user1);
        aquaDAO.executeTheProposal(1);
        vm.stopPrank();

        // Fast forward to make first proposal expired (but it's already executed)
        // and second proposal still active
        vm.warp(block.timestamp + 4 days);

        // Check states
        AquaDAO.ProposalForDisplay[] memory activeProposals = aquaDAO.getActiveProposals();
        assertEq(activeProposals.length, 1); // Second proposal still active
        assertEq(activeProposals[0].id, 2);

        AquaDAO.ProposalForDisplay[] memory executedProposals = aquaDAO.getExecutedProposals();
        assertEq(executedProposals.length, 1); // First proposal executed
        assertEq(executedProposals[0].id, 1);

        AquaDAO.ProposalForDisplay[] memory failedProposals = aquaDAO.getFailedProposals();
        assertEq(failedProposals.length, 0); // No failed proposals

        // Fast forward more to make second proposal expired
        vm.warp(block.timestamp + 2 days);

        // Now second proposal should be failed
        activeProposals = aquaDAO.getActiveProposals();
        assertEq(activeProposals.length, 0);

        failedProposals = aquaDAO.getFailedProposals();
        assertEq(failedProposals.length, 1); // Second proposal failed
        assertEq(failedProposals[0].id, 2);
    }

    /**
     * Test creating a proposal with zero duration
     */
    function test_createProposal_with_zero_duration() public {
        string memory description = "Proposal with zero duration";
        uint256 proposalDuration = 0; // 0 days

        // Create proposal
        vm.startPrank(user1);
        aquaDAO.createProposal(description, proposalDuration);
        vm.stopPrank();

        // Check the proposal was created with deadline at current timestamp
        AquaDAO.ProposalForDisplay memory proposal = aquaDAO.getProposalDetail(1);
        assertEq(proposal.deadline, block.timestamp); // Should be current timestamp + (0 * 1 days)
        assertEq(proposal.description, description);
    }

    /**
     * Test edge case where proposal deadline exactly equals current timestamp
     */
    function test_vote_exactly_at_deadline() public createProposal(user1) {
        // Get the proposal deadline
        AquaDAO.ProposalForDisplay memory proposal = aquaDAO.getProposalDetail(1);
        uint256 deadline = proposal.deadline;

        // Move to exactly the deadline time
        vm.warp(deadline);

        // Try to vote exactly at the deadline - this should succeed as condition is > not >=
        vm.startPrank(user2);
        aquaDAO.vote(1, true); // This should succeed
        vm.stopPrank();

        // Check that the vote was recorded
        assertEq(aquaDAO.getIsHasVoted(1, user2), true);

        // Now move one second past the deadline
        vm.warp(deadline + 1);

        // Try to vote one second past deadline - this should fail
        vm.startPrank(user1);
        vm.expectRevert(AquaDAO.AquaDAO__VotingPeriodHasEnded.selector);
        aquaDAO.vote(1, true);
        vm.stopPrank();
    }
}
