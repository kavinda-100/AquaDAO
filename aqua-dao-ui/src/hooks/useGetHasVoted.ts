"use client";

import { useReadContract } from "wagmi";
import AquaDaoABI from "@/abi/AquaDAO.json";
import { AQUA_DAO_ADDRESS } from "@/abi";

export function useGetHasVoted({
  id,
  account,
}: {
  id: bigint;
  account: `0x${string}`;
}) {
  const {
    data: hasVoted,
    isPending,
    isError,
    error,
  } = useReadContract({
    address: AQUA_DAO_ADDRESS as `0x${string}`,
    abi: AquaDaoABI.abi,
    functionName: "getIsHasVoted",
    args: [id, account],
  });

  return { hasVoted: hasVoted as boolean, isPending, isError, error };
}
