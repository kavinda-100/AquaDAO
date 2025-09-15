"use client";

import { useReadContract } from "wagmi";
import AquaDaoABI from "@/abi/AquaDAO.json";
import { AQUA_DAO_ADDRESS } from "@/abi";
import type { ProposalType } from "@/app/types";

/**
 * @returns proposals - list of active proposals
 * @returns isPending - boolean to check if the request is pending
 * @returns isError - boolean to check if there is an error
 * @returns error - error object
 */
export function useGetExecutedProposals() {
  const {
    data: proposals,
    isPending,
    isError,
    error,
  } = useReadContract({
    address: AQUA_DAO_ADDRESS as `0x${string}`,
    abi: AquaDaoABI.abi,
    functionName: "getExecutedProposals",
    args: [],
  });

  return { proposals: proposals as ProposalType[], isPending, isError, error };
}
