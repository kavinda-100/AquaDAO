"use client";

import React from "react";
import { useWriteContract } from "wagmi";
import { AQUA_DAO_ADDRESS } from "@/abi";
import AquaDaoABI from "@/abi/AquaDAO.json";
import { useGetHasVoted } from "@/hooks/useGetHasVoted";
import { useGetProposalHasPassed } from "@/hooks/useGetProposalHasPassed";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Vote = ({
  id,
  address,
}: {
  id: bigint;
  address: `0x${string}`;
}) => {
  // get hasVoted from the AquaDAO contract
  const {
    hasVoted,
    isPending: isHasVotedPending,
    isError: isHasVotedError,
    error: hasVotedError,
    refetch: refetchHasVoted,
  } = useGetHasVoted({
    id,
    account: address,
  });
  console.log({ hasVoted, isHasVotedPending, isHasVotedError, hasVotedError });

  // get hasProposalPassed from the AquaDAO contract
  const {
    hasProposalPassed,
    isPending: isHasProposalPassedPending,
    isError: isHasProposalPassedError,
    error: hasProposalPassedError,
  } = useGetProposalHasPassed({
    id,
    account: address,
  });
  console.log({
    hasProposalPassed,
    isHasProposalPassedPending,
    isHasProposalPassedError,
    hasProposalPassedError,
  });

  // state to manage the vote (for or against)
  const [support, setSupport] = React.useState<boolean | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isVotingProposalSuccess, setIsVotingProposalSuccess] =
    React.useState(false);
  const [votingProposalError, setVotingProposalError] = React.useState<
    string | null
  >(null);

  const {
    data: hash,
    writeContract,
    isPending: isVotingProposalPending,
  } = useWriteContract();

  // submit vote handler
  const handleVote = () => {
    if (support === null) return;

    writeContract(
      {
        address: AQUA_DAO_ADDRESS as `0x${string}`,
        abi: AquaDaoABI.abi,
        functionName: "vote",
        args: [id, support],
      },
      {
        onSuccess() {
          setVotingProposalError(null);
          setIsVotingProposalSuccess(true);
          setSupport(null); // reset support state after successful vote
          setOpenDialog(true);
          void refetchHasVoted();
        },
        onError(error) {
          setIsVotingProposalSuccess(false);
          setVotingProposalError(
            error?.message || "An error occurred while voting the proposal.",
          );
          setSupport(null); // reset support state after error
          setOpenDialog(true);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* show message if user has already voted */}
      {hasVoted && <p>You have already voted on this proposal.</p>}

      {/* Support Button */}
      <button
        onClick={() => {
          setSupport(true);
          handleVote();
        }}
        disabled={hasVoted || hasProposalPassed || isVotingProposalPending}
        className="cursor-pointer bg-green-600 text-white"
      >
        {isVotingProposalPending
          ? "Submitting Vote..."
          : hasProposalPassed
            ? "Proposal Passed"
            : hasVoted
              ? "Already Voted"
              : "Vote For"}
      </button>
      {/* Against Button */}
      <button
        onClick={() => {
          setSupport(false);
          handleVote();
        }}
        disabled={hasVoted || hasProposalPassed || isVotingProposalPending}
        className="cursor-pointer bg-red-600 text-white"
      >
        {isVotingProposalPending
          ? "Submitting Vote..."
          : hasProposalPassed
            ? "Proposal Passed"
            : hasVoted
              ? "Already Voted"
              : "Vote Against"}
      </button>

      {/* show voting result dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isVotingProposalSuccess
                ? "Vote Submitted Successfully"
                : "Vote Submission Failed"}
            </DialogTitle>
            <DialogDescription>
              {isVotingProposalSuccess
                ? "Thank you for voting! Your vote has been recorded on the blockchain."
                : `There was an error submitting your vote: ${votingProposalError}`}
            </DialogDescription>
          </DialogHeader>
          <div>
            {isVotingProposalSuccess && hash && (
              <p>
                View your transaction on{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Etherscan
                </a>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
