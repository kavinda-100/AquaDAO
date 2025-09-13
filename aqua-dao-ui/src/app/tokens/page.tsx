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
  ShoppingCart,
  Info,
  TrendingUp,
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="pb-4 text-center">
              <div className="from-primary/20 border-primary/30 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-gradient-to-br to-blue-500/20">
                <ShoppingCart className="text-primary h-8 w-8" />
              </div>
              <DialogTitle className="text-2xl font-bold">
                Confirm Your Purchase
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-base">
                Review your token purchase details below
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Purchase Summary */}
              <div className="bg-muted/50 space-y-4 rounded-lg p-4">
                <div className="text-primary flex items-center gap-2 text-lg font-semibold">
                  <Info className="h-5 w-5" />
                  <span>Purchase Summary</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Tokens to purchase:
                    </span>
                    <span className="font-semibold">
                      {form.getValues("token_amount")} AQUA
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Recipient address:
                    </span>
                    <span className="bg-background/50 rounded border px-2 py-1 font-mono text-sm">
                      {form.getValues("wallet_address").slice(0, 6)}...
                      {form.getValues("wallet_address").slice(-4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing Details */}
              <div className="space-y-4 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="flex items-center gap-2 text-lg font-semibold text-green-800 dark:text-green-200">
                  <TrendingUp className="h-5 w-5" />
                  <span>Pricing Details</span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-lg border border-green-200/50 bg-white/50 p-4 dark:border-green-700/50 dark:bg-green-900/30">
                    <p className="mb-2 text-sm font-medium text-green-700 dark:text-green-300">
                      Total Price (ETH)
                    </p>
                    <p className="font-mono text-xl font-bold break-all text-green-800 dark:text-green-100">
                      {formatEther(
                        calculateTotalPrice(form.getValues("token_amount")),
                      )}{" "}
                      ETH
                    </p>
                  </div>
                  <div className="rounded-lg border border-green-200/50 bg-white/50 p-4 dark:border-green-700/50 dark:bg-green-900/30">
                    <p className="mb-2 text-sm font-medium text-green-700 dark:text-green-300">
                      Total Price (Wei)
                    </p>
                    <p className="font-mono text-xl font-bold break-all text-green-800 dark:text-green-100">
                      {formatGwei(
                        calculateTotalPrice(form.getValues("token_amount")),
                        "wei",
                      )}{" "}
                      Wei
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <div className="text-sm">
                  <p className="mb-1 font-medium text-amber-800 dark:text-amber-200">
                    Important Notice
                  </p>
                  <p className="text-amber-700 dark:text-amber-300">
                    Please ensure you have sufficient ETH in your connected
                    wallet to cover the total price plus gas fees.
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex w-full justify-end space-x-3 pt-6">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-11 px-6"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmPurchase}
                disabled={isMintingPending}
                className="from-primary hover:from-primary/90 h-11 bg-gradient-to-r to-blue-500 px-6 font-semibold hover:to-blue-500/90"
              >
                {isMintingPending ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm Purchase
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* final result */}
        <Dialog open={openFinalDialog} onOpenChange={setOpenFinalDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="pb-4 text-center">
              <div
                className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 ${
                  isWritingContractSuccess
                    ? "border-green-300 bg-gradient-to-br from-green-100 to-emerald-100 dark:border-green-700 dark:from-green-900/30 dark:to-emerald-900/30"
                    : "border-red-300 bg-gradient-to-br from-red-100 to-rose-100 dark:border-red-700 dark:from-red-900/30 dark:to-rose-900/30"
                }`}
              >
                {isWritingContractSuccess ? (
                  <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                ) : (
                  <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                )}
              </div>
              <DialogTitle
                className={`text-2xl font-bold ${
                  isWritingContractSuccess
                    ? "text-green-800 dark:text-green-200"
                    : "text-red-800 dark:text-red-200"
                }`}
              >
                {isWritingContractSuccess
                  ? "🎉 Success! AQUA Tokens Minted"
                  : "❌ Transaction Failed"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {isWritingContractSuccess && (
                <div className="space-y-4 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
                  <div className="space-y-2 text-center">
                    <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Congratulations! 🎊
                    </p>
                    <p className="text-green-700 dark:text-green-300">
                      You have successfully minted{" "}
                      <span className="font-bold">
                        {form.getValues("token_amount")} AQUA tokens
                      </span>{" "}
                      to your wallet.
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-200/50 bg-white/50 p-4 dark:border-green-700/50 dark:bg-green-900/30">
                    <div className="mb-2 flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        Recipient Address
                      </span>
                    </div>
                    <p className="font-mono text-sm break-all text-green-800 dark:text-green-200">
                      {form.getValues("wallet_address")}
                    </p>
                  </div>

                  {hash && (
                    <div className="rounded-lg border border-green-200/50 bg-white/50 p-4 dark:border-green-700/50 dark:bg-green-900/30">
                      <div className="mb-2 flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          Transaction Hash
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="rounded bg-green-100/50 px-2 py-1 font-mono text-xs break-all text-green-800 dark:bg-green-800/30 dark:text-green-200">
                          {hash}
                        </p>
                        <a
                          href={`https://sepolia.etherscan.io/tx/${hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View on Sepolia Etherscan
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!isWritingContractSuccess && (
                <div className="space-y-4 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-6 dark:border-red-800 dark:from-red-900/20 dark:to-rose-900/20">
                  <div className="space-y-2 text-center">
                    <p className="text-lg font-semibold text-red-800 dark:text-red-200">
                      Transaction Failed
                    </p>
                    <p className="text-red-700 dark:text-red-300">
                      We encountered an error while processing your token
                      purchase.
                    </p>
                  </div>

                  <div className="rounded-lg border border-red-200/50 bg-white/50 p-4 dark:border-red-700/50 dark:bg-red-900/30">
                    <div className="mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <span className="text-sm font-medium text-red-700 dark:text-red-300">
                        Error Details
                      </span>
                    </div>
                    <p className="rounded bg-red-100/50 px-3 py-2 text-sm text-red-800 dark:bg-red-800/30 dark:text-red-200">
                      {writingContractError?.message ??
                        "Unknown error occurred"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                    <div className="flex items-start gap-2">
                      <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                      <div className="text-sm">
                        <p className="mb-1 font-medium text-blue-800 dark:text-blue-200">
                          What to do next:
                        </p>
                        <ul className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                          <li>• Check your wallet connection</li>
                          <li>• Ensure sufficient ETH balance for gas fees</li>
                          <li>• Try the transaction again</li>
                          <li>• Contact support if the issue persists</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="pt-6">
              <Button
                onClick={() => {
                  form.reset(); // reset form after success or failure
                  setOpenFinalDialog(false);
                }}
                className={`h-12 w-full font-semibold ${
                  isWritingContractSuccess
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                    : "from-primary hover:from-primary/90 bg-gradient-to-r to-blue-500 hover:to-blue-500/90"
                }`}
              >
                {isWritingContractSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Continue
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Try Again
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TokenBuyPage;
