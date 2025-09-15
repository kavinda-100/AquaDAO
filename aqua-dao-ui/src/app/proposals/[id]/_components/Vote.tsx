"use client";

import React from "react";
import { useGetHasVoted } from "@/hooks/useGetHasVoted";
import { useGetProposalHasPassed } from "@/hooks/useGetProposalHasPassed";

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

  return <div></div>;
};
