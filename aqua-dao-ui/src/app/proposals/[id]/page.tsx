"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { AQUA_GOV_TOKEN_ADDRESS } from "@/abi";
import AquaGovTokenABI from "@/abi/AquaGovToken.json";
import { useGetProposalDetail } from "@/hooks/useGetProposalDetail";
import { Vote } from "./_components/Vote";
import { ExecuteTheProposal } from "./_components/ExecuteTheProposal";

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
    return <div>Error: Proposal ID is missing in the URL.</div>;
  }

  // if account is not connected, show a message
  if (!account.isConnected) {
    return <div>Please connect your wallet to view proposal details.</div>;
  }

  const balance: number = tokenBalance
    ? Number(BigInt(tokenBalance as bigint))
    : 0;

  // render token balance like this to avoid errors
  const renderTokenBalance = () => {
    if (isTokenBalancePending) {
      return <div>Loading token balance...</div>;
    }

    if (isTokenBalanceError) {
      return (
        <p className="text-muted-foreground text-sm">
          {tokenBalanceError?.message ?? "Unknown error"}
        </p>
      );
    }

    if (tokenBalance) {
      return <div>Your token balance: {balance}</div>;
    }

    return null;
  };

  return (
    <section className="size-full">
      {/* Show User Token balance */}
      <div>{renderTokenBalance()}</div>

      {/* show proposal details */}
      {isPending && <div>Loading proposal details...</div>}
      {isError && (
        <div className="text-destructive">
          Error loading proposal details: {error?.message ?? "Unknown error"}
        </div>
      )}
      <div>
        {proposal && (
          <>
            <h2>{proposal.description}</h2>
            {/* convert BigInt to number for display */}
            <p>{Number(proposal.id)}</p>
            <p>{proposal.proposer}</p>
            <p>{Number(proposal.deadline)}</p>
            <p>{Number(proposal.votesFor)}</p>
            <p>{Number(proposal.votesAgainst)}</p>
            <p>{proposal.executed ? "Executed" : "Not Executed"}</p>
            <p>{proposal.isProposalHasPassed ? "Yes" : "No"}</p>
          </>
        )}
      </div>

      {/* Vote Component */}
      <Vote id={BigInt(params.id)} address={account.address!} />

      {/* ExecuteTheProposal Component (Only Owner) */}
      {account.address === proposal.proposer && <ExecuteTheProposal />}
    </section>
  );
};

export default ProposalDetailPage;
