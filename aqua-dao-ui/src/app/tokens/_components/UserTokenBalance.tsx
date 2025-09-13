"use client";

import React from "react";
import { useAccount, useReadContract } from "wagmi";
import { AQUA_GOV_TOKEN_ADDRESS } from "@/abi";
import AquaGovTokenABI from "@/abi/AquaGovToken.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Wallet, AlertCircle, Loader2 } from "lucide-react";

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
    return (
      <Card className="bg-card/50 border-border/50 w-full shadow-lg backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-12">
          <div className="space-y-3 text-center">
            <Wallet className="text-muted-foreground mx-auto h-12 w-12" />
            <p className="text-muted-foreground text-lg font-medium">
              Please connect your wallet to see your token balance
            </p>
          </div>
        </CardContent>
      </Card>
    );

  // handle loading states
  if (isTokenBalancePending)
    return (
      <Card className="bg-card/50 border-border/50 w-full shadow-lg backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-12">
          <div className="space-y-3 text-center">
            <Loader2 className="text-primary mx-auto h-8 w-8 animate-spin" />
            <p className="text-muted-foreground text-lg font-medium">
              Loading token balance...
            </p>
          </div>
        </CardContent>
      </Card>
    );

  // handle error states
  if (isTokenBalanceError)
    return (
      <Card className="bg-card/50 border-border/50 w-full shadow-lg backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-12">
          <div className="space-y-3 text-center">
            <AlertCircle className="text-destructive mx-auto h-12 w-12" />
            <p className="text-destructive text-lg font-medium">
              Error loading token balance
            </p>
            <p className="text-muted-foreground text-sm">
              {tokenBalanceError?.message ?? "Unknown error"}
            </p>
          </div>
        </CardContent>
      </Card>
    );

  console.log("User Token Balance:", tokenBalance);

  const balance = tokenBalance ? Number(BigInt(tokenBalance as bigint)) : 0;

  return (
    <Card className="bg-card/50 border-border/50 w-full shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-4 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Coins className="text-primary h-6 w-6" />
          <CardTitle className="text-xl font-bold">Your AQUA Balance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <div className="from-primary/10 border-primary/20 rounded-xl border bg-gradient-to-br to-blue-500/10 p-6">
          <div className="from-primary mb-2 bg-gradient-to-r to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
            {balance.toLocaleString()}
          </div>
          <div className="text-muted-foreground text-lg font-semibold">
            AQUA Token{balance === 1 ? "" : "s"}
          </div>
          {balance > 0 && (
            <p className="text-muted-foreground mt-3 text-sm">
              You own{" "}
              {balance === 1
                ? "1 governance token"
                : `${balance.toLocaleString()} governance tokens`}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
