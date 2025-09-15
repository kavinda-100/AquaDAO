"use client";

import { useReadContract } from "wagmi";
import AquaDaoABI from "@/abi/AquaDAO.json";
import { AQUA_DAO_ADDRESS } from "@/abi";

export function useGetProposalHasPassed({
  id,
  account,
}: {
  id: bigint;
  account: `0x${string}`;
}) {
  const {
    data: hasProposalPassed,
    isPending,
    isError,
    error,
  } = useReadContract({
    address: AQUA_DAO_ADDRESS as `0x${string}`,
    abi: AquaDaoABI.abi,
    functionName: "getIsProposalHasPassed",
    args: [id, account],
  });

  return {
    hasProposalPassed: hasProposalPassed as boolean,
    isPending,
    isError,
    error,
  };
}
