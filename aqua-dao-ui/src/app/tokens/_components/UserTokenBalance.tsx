"use client";

import React from "react";
import { useAccount, useReadContract } from "wagmi";
import { AQUA_GOV_TOKEN_ADDRESS } from "@/abi";
import AquaGovTokenABI from "@/abi/AquaGovToken.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const UserTokenBalance = () => {
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

  // if the user is not connected, show a message
  if (!account.isConnected)
    return <div>Please connect your wallet to see your token balance.</div>;

  // handle loading states
  if (isTokenBalancePending) return <div>Loading token balance...</div>;

  // handle error states
  if (isTokenBalanceError)
    return (
      <div>
        Error loading token balance:{" "}
        {tokenBalanceError?.message ?? "Unknown error"}
      </div>
    );

  console.log("User Token Balance:", tokenBalance);

  return (
    <section className="w-full">
      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle>User AQUA Token Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {tokenBalance ? Number(BigInt(tokenBalance as bigint)) : "0"} AQUA
            Token{Number(BigInt(tokenBalance as bigint)) === 1 ? "" : "s"}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
