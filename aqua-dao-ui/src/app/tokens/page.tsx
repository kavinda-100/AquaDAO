"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { AQUA_GOV_TOKEN_ADDRESS } from "@/abi";
import AquaGovTokenABI from "@/abi/AquaGovToken.json";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatEther, formatGwei } from "viem";
import {
  Loader2Icon,
  Coins,
  Wallet,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { UserTokenBalance } from "./_components/UserTokenBalance";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  wallet_address: z
    .string()
    .min(42, "Wallet address must be 42 characters")
    .max(42, "Wallet address must be 42 characters")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum wallet address format"),
  token_amount: z.number().min(1, "Must request at least 1 token"),
});

const TokenBuyPage = () => {
  const [open, setOpen] = React.useState(false); // confirmation dialog
  const [openFinalDialog, setOpenFinalDialog] = React.useState(false); // final success or failure dialog
  const [isWritingContractSuccess, setIsWritingContractSuccess] =
    React.useState(false); // track if contract write was successful
  const [writingContractError, setIsWritingContractError] =
    React.useState<Error | null>(null); // track contract write error

  // use account hook
  const account = useAccount();

  // useQueryClient hook
  const queryClient = useQueryClient();

  // minting to contract
  const {
    data: hash,
    writeContract,
    isPending: isMintingPending,
  } = useWriteContract();

  // get token price from contract
  const {
    data: tokenPrice,
    isPending: isTokenPricePending,
    isError: isTokenPriceError,
    error: tokenPriceError,
    queryKey: readContractQueryKey,
  } = useReadContract({
    address: AQUA_GOV_TOKEN_ADDRESS as `0x${string}`,
    abi: AquaGovTokenABI.abi,
    functionName: "getMintPrice",
    args: [],
  });
  console.log("Token Price Error:", tokenPriceError);
  console.log("type of the token price:", typeof tokenPrice); // should be 'bigint' if fetched correctly

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wallet_address: "",
      token_amount: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setOpen(true);
  }

  // useEffect to set the wallet address field if the user is connected
  React.useEffect(() => {
    if (account.isConnected && account.address) {
      form.setValue("wallet_address", account.address);
    }
  }, [account.address, account.isConnected, form]);

  /**
   * Calculate the total price for a given number of tokens.
   * @param tokenAmount number of tokens to buy
   * @returns total price in wei (as a BigInt)
   */
  function calculateTotalPrice(tokenAmount: number): bigint {
    if (tokenPrice && typeof tokenPrice === "bigint") {
      // tokenPrice is 1 wei per token, so total = tokenAmount * 1 wei
      return BigInt(tokenAmount) * tokenPrice;
    }
    return BigInt(0);
  }

  // confirm purchase and call the contract
  function confirmPurchase() {
    const values = form.getValues();
    const totalCost = calculateTotalPrice(values.token_amount);

    writeContract(
      {
        address: AQUA_GOV_TOKEN_ADDRESS as `0x${string}`,
        abi: AquaGovTokenABI.abi,
        functionName: "mint",
        args: [BigInt(values.token_amount)],
        value: totalCost,
      },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: readContractQueryKey,
          });
          console.log("Minting transaction sent:", hash);
          setOpen(false);
          setIsWritingContractSuccess(true);
          setIsWritingContractError(null);
          setOpenFinalDialog(true);
        },
        onError(error) {
          console.error("Error minting tokens:", error);
          setOpen(false);
          setIsWritingContractSuccess(false);
          setIsWritingContractError(error);
          setOpenFinalDialog(true);
        },
      },
    );
  }

  return (
    <section className="from-background via-background to-primary/5 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br px-4 py-20">
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold">
            <Coins className="h-4 w-4" />
            Token Purchase
          </div>
          <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
            Get Your{" "}
            <span className="from-primary to-primary bg-gradient-to-r via-blue-500 bg-clip-text text-transparent">
              AQUA Tokens
            </span>
          </h1>
          <p className="text-muted-foreground text-xl">
            Purchase governance tokens to participate in AquaDAO decisions
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-card/50 border-border/50 mx-auto w-full max-w-2xl shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-6 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <CreditCard className="text-primary h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Purchase AQUA Tokens
            </CardTitle>
            <CardDescription className="text-base">
              Fill out the form below to buy your governance tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="wallet_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-semibold">
                        <Wallet className="text-primary h-4 w-4" />
                        Wallet Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0x..."
                          {...field}
                          disabled={isTokenPricePending}
                          className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 h-12 text-base"
                        />
                      </FormControl>
                      <FormDescription className="text-sm">
                        This is your public wallet address where tokens will be
                        sent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="token_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-semibold">
                        <Coins className="text-primary h-4 w-4" />
                        Token Amount
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          placeholder="1"
                          disabled={isTokenPricePending}
                          {...field}
                          className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 h-12 text-base"
                        />
                      </FormControl>
                      <FormDescription className="text-sm">
                        Number of AQUA governance tokens to purchase
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="from-primary hover:from-primary/90 h-12 w-full bg-gradient-to-r to-blue-500 text-base font-semibold shadow-lg transition-all duration-200 hover:to-blue-500/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isTokenPricePending || isMintingPending}
                >
                  {isMintingPending ? (
                    <>
                      <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                      Processing Transaction...
                    </>
                  ) : isTokenPricePending ? (
                    <>
                      <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                      Loading Price...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Buy AQUA Tokens
                    </>
                  )}
                </Button>

                {/* Transaction Status */}
                {hash && (
                  <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                    <div className="mb-2 flex items-center gap-2 text-green-800 dark:text-green-200">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">
                        Transaction Submitted!
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-green-700 dark:text-green-300">
                        Your transaction has been submitted to the blockchain.
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-mono break-all text-green-600 dark:text-green-400">
                          {hash}
                        </span>
                        <a
                          href={`https://etherscan.io/tx/${hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-xs">View on Etherscan</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="bg-muted/30 border-border/50 rounded-b-lg border-t">
            {isTokenPriceError && (
              <div className="text-destructive flex w-full items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <p className="font-medium">Error fetching token price</p>
              </div>
            )}
            {!isTokenPriceError && isTokenPricePending && (
              <div className="text-muted-foreground flex w-full items-center gap-2">
                <Loader2Icon className="h-5 w-5 animate-spin" />
                <p>Loading token price...</p>
              </div>
            )}
            {!isTokenPriceError && !isTokenPricePending && (
              <div className="w-full space-y-3">
                <div className="text-primary mb-3 flex items-center gap-2 font-semibold">
                  <Coins className="h-5 w-5" />
                  <span>Current Token Pricing</span>
                </div>
                <div className="mb-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-background/50 border-border/30 rounded-lg border p-3">
                    <p className="text-muted-foreground mb-1 text-sm">
                      Price in ETH
                    </p>
                    <p className="font-mono text-lg font-bold">
                      {formatEther(BigInt(tokenPrice as `0x${string}`))} ETH
                    </p>
                    <p className="text-muted-foreground text-xs">
                      per AQUA token
                    </p>
                  </div>
                  <div className="bg-background/50 border-border/30 rounded-lg border p-3">
                    <p className="text-muted-foreground mb-1 text-sm">
                      Price in Wei
                    </p>
                    <p className="font-mono text-lg font-bold">
                      {formatGwei(BigInt(tokenPrice as `0x${string}`), "wei")}{" "}
                      Wei
                    </p>
                    <p className="text-muted-foreground text-xs">
                      per AQUA token
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardFooter>
        </Card>

        {/* User Token Balance */}
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-4 text-center">
            <div className="text-primary inline-flex items-center gap-2 font-semibold">
              <Wallet className="h-5 w-5" />
              <span>Your Token Balance</span>
            </div>
          </div>
          <UserTokenBalance />
        </div>

        {/* confirmation Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmation Buying AQUA Tokens</DialogTitle>
              <DialogDescription>
                Below show the calculated token price in ETH.
              </DialogDescription>
            </DialogHeader>
            <div>
              <p>
                confirming purchase of {form.getValues("token_amount")} tokens
                to {form.getValues("wallet_address")}
              </p>
              <p>
                Total Price (ETH):{" "}
                {formatEther(
                  calculateTotalPrice(form.getValues("token_amount")),
                )}
              </p>
              <p>
                Total Price (Wei):{" "}
                {formatGwei(
                  calculateTotalPrice(form.getValues("token_amount")),
                  "wei",
                )}
              </p>
              <p>
                Note: You will need to have sufficient ETH in your connected
                wallet to cover the total price.
              </p>
            </div>
            <DialogFooter className="flex w-full justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmPurchase} disabled={isMintingPending}>
                {isMintingPending ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  "Confirm Purchase"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* final result */}
        <Dialog open={openFinalDialog} onOpenChange={setOpenFinalDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isWritingContractSuccess
                  ? "Success! AQUA Tokens Minted"
                  : "Error Minting AQUA Tokens"}
              </DialogTitle>
            </DialogHeader>
            <div>
              {isWritingContractSuccess && (
                <div>
                  <p>Congratulations!</p>
                  <p>
                    You have successfully minted{" "}
                    {form.getValues("token_amount")} AQUA tokens to wallet
                    address {form.getValues("wallet_address")}.
                  </p>
                  <span>
                    Transaction Hash:{" "}
                    <a
                      href={`https://sepolia.etherscan.io/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {hash}
                    </a>
                  </span>
                </div>
              )}
              {!isWritingContractSuccess && (
                <p className="text-red-500">
                  There was an error minting your AQUA tokens:{" "}
                  {writingContractError?.message ?? "Unknown error"}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  form.reset(); // reset form after success or failure
                  setOpenFinalDialog(false);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TokenBuyPage;
