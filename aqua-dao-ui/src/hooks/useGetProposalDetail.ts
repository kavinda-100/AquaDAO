"use client";

import { useReadContract } from "wagmi";
import AquaDaoABI from "@/abi/AquaDAO.json";
import { AQUA_DAO_ADDRESS } from "@/abi";
import type { ProposalType } from "@/app/types";

export function useGetProposalDetail({ id }: { id: bigint }) {
  const {
    data: proposal,
    isPending,
    isError,
    error,
  } = useReadContract({
    address: AQUA_DAO_ADDRESS as `0x${string}`,
    abi: AquaDaoABI.abi,
    functionName: "getProposalDetail",
    args: [id],
  });

  return { proposal: proposal as ProposalType, isPending, isError, error };
}
