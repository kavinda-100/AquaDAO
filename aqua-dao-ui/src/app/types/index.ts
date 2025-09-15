/**
 * @description Proposal for display in the UI
 * @see contracts/AquaDAO.sol
 *
 * ```solidity
 * struct ProposalForDisplay {
 *         uint256 id; // proposal ID
 *         address proposer; // address of the proposer
 *         string description; // description of the proposal
 *         uint256 votesFor; // number of votes for the proposal
 *         uint256 votesAgainst; // number of votes against the proposal
 *         uint256 deadline; // deadline for voting
 *         bool executed; // whether the proposal has been executed
 *         bool isProposalHasPassed; // Indicates if the proposal has passed
 *     } // proposal for display in the UI
 * ```
 *
 */
export type ProposalType = {
  id: bigint;
  proposer: `0x${string}`;
  description: string;
  votesFor: bigint;
  votesAgainst: bigint;
  deadline: bigint;
  executed: boolean;
  isProposalHasPassed: boolean;
};
