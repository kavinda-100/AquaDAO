"use client";

import React from "react";
import { useWriteContract } from "wagmi";
import { AQUA_DAO_ADDRESS } from "@/abi";
import AquaDaoABI from "@/abi/AquaDAO.json";

export function useVote({ id, support }: { id: bigint; support: boolean }) {
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
      },
      onError(error) {
        setIsVotingProposalSuccess(false);
        setVotingProposalError(
          error?.message || "An error occurred while voting the proposal.",
        );
      },
    },
  );

  return {
    isVotingProposalSuccess,
    votingProposalError,
    isVotingProposalPending,
    hash,
  };
}
