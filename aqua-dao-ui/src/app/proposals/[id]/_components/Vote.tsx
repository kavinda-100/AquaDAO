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
import {
  ThumbsUp,
  ThumbsDown,
  Loader2,
  CheckCircle,
  XCircle,
  Vote as VoteIcon,
  ExternalLink,
} from "lucide-react";

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
    <div className="bg-card/50 border-border/50 space-y-6 rounded-xl border p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="border-border/50 flex items-center gap-3 border-b pb-4">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
          <VoteIcon className="text-primary h-4 w-4" />
        </div>
        <div>
          <h3 className="text-foreground text-lg font-semibold">
            Cast Your Vote
          </h3>
          <p className="text-muted-foreground text-sm">
            Make your voice heard in this governance proposal
          </p>
        </div>
      </div>

      {/* Voting Status */}
      {hasVoted && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <div>
            <p className="font-medium text-green-800 dark:text-green-200">
              Vote Recorded
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              You have already voted on this proposal
            </p>
          </div>
        </div>
      )}

      {/* Voting Buttons */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Vote For Button */}
        <button
          onClick={() => {
            setSupport(true);
            handleVote();
          }}
          disabled={hasVoted || hasProposalPassed || isVotingProposalPending}
          className="group relative flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 p-4 font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 disabled:opacity-50"
        >
          {isVotingProposalPending && support === true ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Submitting Vote...</span>
            </>
          ) : hasProposalPassed ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span>Proposal Passed</span>
            </>
          ) : hasVoted ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span>Already Voted</span>
            </>
          ) : (
            <>
              <ThumbsUp className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>Vote For</span>
            </>
          )}
        </button>

        {/* Vote Against Button */}
        <button
          onClick={() => {
            setSupport(false);
            handleVote();
          }}
          disabled={hasVoted || hasProposalPassed || isVotingProposalPending}
          className="group relative flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 p-4 font-semibold text-white shadow-lg transition-all duration-200 hover:from-red-600 hover:to-rose-700 hover:shadow-xl disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 disabled:opacity-50"
        >
          {isVotingProposalPending && support === false ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Submitting Vote...</span>
            </>
          ) : hasProposalPassed ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span>Proposal Passed</span>
            </>
          ) : hasVoted ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span>Already Voted</span>
            </>
          ) : (
            <>
              <ThumbsDown className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>Vote Against</span>
            </>
          )}
        </button>
      </div>

      {/* show voting result dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-4 text-center">
            <div className="from-primary/20 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r to-blue-500/20">
              {isVotingProposalSuccess ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <DialogTitle className="text-xl">
              {isVotingProposalSuccess
                ? "Vote Submitted Successfully"
                : "Vote Submission Failed"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {isVotingProposalSuccess
                ? "Thank you for voting! Your vote has been recorded on the blockchain."
                : `There was an error submitting your vote: ${votingProposalError}`}
            </DialogDescription>
          </DialogHeader>

          {isVotingProposalSuccess && hash && (
            <div className="bg-muted/50 flex items-center gap-2 rounded-lg p-4">
              <ExternalLink className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">
                View your transaction on{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline transition-colors"
                >
                  Etherscan
                </a>
              </span>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
