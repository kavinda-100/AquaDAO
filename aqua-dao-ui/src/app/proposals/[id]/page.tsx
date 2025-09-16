"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { AQUA_GOV_TOKEN_ADDRESS } from "@/abi";
import AquaGovTokenABI from "@/abi/AquaGovToken.json";
import { useGetProposalDetail } from "@/hooks/useGetProposalDetail";
import { Vote } from "./_components/Vote";
import { ExecuteTheProposal } from "./_components/ExecuteTheProposal";
import { getTimeRemaining } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeft,
  Coins,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  FileText,
  Vote as VoteIcon,
  Clock,
} from "lucide-react";

const ProposalDetailPage = () => {
  const params = useParams<{ id: string }>();
  const account = useAccount();

  // get token balance of the connected user from the AquaGovToken contract
  const {
    data: tokenBalance,
    isPending: isTokenBalancePending,
    isError: isTokenBalanceError,
    error: tokenBalanceError,
    refetch: refetchTokenBalance,
  } = useReadContract({
    address: AQUA_GOV_TOKEN_ADDRESS as `0x${string}`,
    abi: AquaGovTokenABI.abi,
    functionName: "balanceOf",
    args: [account.address],
    query: {
      enabled: account.isConnected, // only fetch if the user is connected,
    },
  });

  // refetch token balance when the account address changes
  React.useEffect(() => {
    void refetchTokenBalance();

    // cleanup function
    return () => {
      void refetchTokenBalance();
    };
  }, [account.address, refetchTokenBalance]);

  // get proposal detail from the AquaDAO contract
  const { proposal, isPending, isError, error } = useGetProposalDetail({
    id: BigInt(params.id),
  });

  // if id is not present in the params, show an error
  if (!params.id) {
    return (
      <div className="from-background via-background/95 to-primary/5 min-h-screen bg-gradient-to-br p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center space-y-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-foreground text-xl font-semibold">
                Invalid Proposal
              </h2>
              <p className="text-muted-foreground">
                Proposal ID is missing in the URL.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if account is not connected, show a message
  if (!account.isConnected) {
    return (
      <div className="from-background via-background/95 to-primary/5 min-h-screen bg-gradient-to-br p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center space-y-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
              <AlertCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-foreground text-xl font-semibold">
                Wallet Not Connected
              </h2>
              <p className="text-muted-foreground">
                Please connect your wallet to view proposal details.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const balance: number = tokenBalance
    ? Number(BigInt(tokenBalance as bigint))
    : 0;

  // render token balance like this to avoid errors
  const renderTokenBalance = () => {
    if (isTokenBalancePending) {
      return (
        <div className="flex items-center gap-3">
          <Loader2 className="text-primary h-5 w-5 animate-spin" />
          <span className="text-muted-foreground">
            Loading token balance...
          </span>
        </div>
      );
    }

    if (isTokenBalanceError) {
      return (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-800 dark:text-red-200">
            {tokenBalanceError?.message ?? "Unknown error"}
          </p>
        </div>
      );
    }

    if (tokenBalance) {
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Coins className="h-3 w-3 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-foreground text-lg font-semibold">
            {balance.toLocaleString()} AQUA
          </span>
        </div>
      );
    }

    return (
      <div className="text-muted-foreground flex items-center gap-3">
        <Coins className="h-5 w-5" />
        <span>You have no tokens</span>
      </div>
    );
  };

  return (
    <section className="from-background via-background/95 to-primary/5 min-h-screen bg-gradient-to-br p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header with Back Navigation */}
        <div className="space-y-6">
          <Link
            href="/proposals/all"
            className="group text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Proposals</span>
          </Link>

          <div className="space-y-4 text-center">
            <div className="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold">
              <FileText className="h-4 w-4" />
              Proposal Details
            </div>
            <h1 className="text-3xl font-bold lg:text-4xl">
              <span className="from-primary to-primary bg-gradient-to-r via-blue-500 bg-clip-text text-transparent">
                Proposal #{params.id}
              </span>
            </h1>
          </div>
        </div>

        {/* Token Balance Card */}
        <div className="bg-card/50 border-border/50 rounded-xl border p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <Coins className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-foreground text-lg font-semibold">
              Your Voting Power
            </h3>
          </div>
          {renderTokenBalance()}
        </div>

        {/* Proposal Details */}
        {isPending && (
          <div className="flex flex-col items-center justify-center space-y-4 py-16">
            <div className="relative">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
              <div className="border-primary/20 absolute inset-0 h-8 w-8 animate-pulse rounded-full border-2" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-foreground text-lg font-semibold">
                Loading proposal details...
              </h3>
              <p className="text-muted-foreground text-sm">
                Fetching proposal data from the blockchain
              </p>
            </div>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center space-y-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-foreground text-lg font-semibold">
                Error loading proposal
              </h3>
              <p className="text-muted-foreground max-w-md text-sm">
                {error?.message ??
                  "Something went wrong while fetching the proposal details. Please try again later."}
              </p>
            </div>
          </div>
        )}

        {proposal && (
          <div className="space-y-6">
            {/* Main Proposal Card */}
            <div className="bg-card/50 border-border/50 space-y-6 rounded-xl border p-6 backdrop-blur-sm">
              {/* Description */}
              <div>
                <h2 className="text-foreground mb-4 text-2xl font-bold">
                  {proposal.description}
                </h2>
              </div>

              {/* Proposal Info Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Proposal ID */}
                <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-4">
                  <FileText className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="text-muted-foreground text-sm">Proposal ID</p>
                    <p className="text-foreground font-semibold">
                      #{Number(proposal.id)}
                    </p>
                  </div>
                </div>

                {/* Proposer */}
                <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-4">
                  <User className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="text-muted-foreground text-sm">Proposed by</p>
                    <p
                      className="text-foreground truncate font-mono text-sm"
                      title={proposal.proposer}
                    >
                      {proposal.proposer.slice(0, 6)}...
                      {proposal.proposer.slice(-4)}
                    </p>
                  </div>
                </div>

                {/* Deadline */}
                <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-4">
                  <Calendar className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="text-muted-foreground text-sm">Deadline</p>
                    <p className="text-foreground font-semibold">
                      {
                        getTimeRemaining(Number(proposal.deadline) * 1000)
                          .timeLeft
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Voting Results */}
              <div className="space-y-4">
                <h3 className="text-foreground flex items-center gap-2 text-lg font-semibold">
                  <VoteIcon className="h-5 w-5" />
                  Voting Results
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Votes For */}
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                    <div className="mb-2 flex items-center gap-3">
                      <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-green-800 dark:text-green-200">
                        Votes For
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {Number(proposal.votesFor)}
                    </p>
                  </div>

                  {/* Votes Against */}
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                    <div className="mb-2 flex items-center gap-3">
                      <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="font-medium text-red-800 dark:text-red-200">
                        Votes Against
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {Number(proposal.votesAgainst)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                    proposal.executed
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                  }`}
                >
                  {proposal.executed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                  {proposal.executed ? "Executed" : "Pending"}
                </div>

                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                    proposal.isProposalHasPassed
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  }`}
                >
                  {proposal.isProposalHasPassed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {proposal.isProposalHasPassed ? "Passed" : "Not Passed"}
                </div>
              </div>
            </div>

            {/* if vote balance is 0 */}
            {account.isConnected && proposal && balance === 0 && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                      Voting Power Required
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      You need to hold AQUA tokens to participate in this
                      governance proposal. Your voting power is determined by
                      your token balance.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                      <Coins className="h-4 w-4" />
                      <span>Current balance: 0 AQUA tokens</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vote Component */}
            {account.isConnected && proposal && balance > 0 && (
              <Vote id={BigInt(params.id)} address={account.address!} />
            )}

            {/* ExecuteTheProposal Component (Only Owner) */}
            {proposal && account.address === proposal.proposer && (
              <div className="bg-card/50 border-border/50 rounded-xl border p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                    <CheckCircle className="text-primary h-4 w-4" />
                  </div>
                  <h3 className="text-foreground text-lg font-semibold">
                    Proposal Actions
                  </h3>
                </div>
                <ExecuteTheProposal
                  id={BigInt(params.id)}
                  voteFor={proposal.votesFor}
                  voteAgainst={proposal.votesAgainst}
                  isExecuted={proposal.executed}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProposalDetailPage;
