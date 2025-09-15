"use client";

import { useReadContract } from "wagmi";
import AquaDaoABI from "@/abi/AquaDAO.json";
import { AQUA_DAO_ADDRESS } from "@/abi";
import type { ProposalType } from "@/app/types";

/**
 * @param userAddress - address of the user
 * @returns proposals - list of proposals created by the user
 * @returns isPending - boolean to check if the request is pending
 * @returns isError - boolean to check if there is an error
 * @returns error - error object
 */
export function useGetUserProposals(userAddress: `0x${string}` | undefined) {
  const {
    data: proposals,
    isPending,
    isError,
    error,
  } = useReadContract({
    address: AQUA_DAO_ADDRESS as `0x${string}`,
    abi: AquaDaoABI.abi,
    functionName: "getUserProposals",
    args: [userAddress],
    query: {
      enabled: !!userAddress, // only run the query if userAddress is defined
    },
  });

  // if userAddress is undefined, return empty array
  if (!userAddress) {
    return {
      proposals: [] as ProposalType[],
      isPending: false,
      isError: false,
      error: null,
    };
  }

  return { proposals: proposals as ProposalType[], isPending, isError, error };
}
