"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useReadContract, useWriteContract } from "wagmi";
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
import { Loader2Icon } from "lucide-react";

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
        onSuccess() {
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
    <section className="flex size-full flex-col items-center justify-center px-4">
      <Card className="w-full max-w-xl min-w-md">
        <CardHeader>
          <CardTitle>Get AQUA Tokens</CardTitle>
          <CardDescription>
            Fill out the form below to receive your AQUA tokens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="wallet_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0x..."
                        {...field}
                        disabled={isTokenPricePending}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public wallet address.
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
                    <FormLabel>Token Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        step={1}
                        placeholder="1"
                        disabled={isTokenPricePending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Number of AQUA tokens to acquire.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Buy AQUA Tokens</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          {isTokenPriceError && (
            <p className="text-red-500">Error fetching token price</p>
          )}
          {!isTokenPriceError && isTokenPricePending && (
            <p>Loading token price...</p>
          )}
          {!isTokenPriceError && !isTokenPricePending && (
            <div>
              <p>
                Current Token Price:{" "}
                {formatEther(BigInt(tokenPrice as `0x${string}`))} ETH per AQUA
                token
              </p>
              <p>
                Current Token Price:{" "}
                {formatGwei(BigInt(tokenPrice as `0x${string}`), "wei")} Wei per
                AQUA token
              </p>
            </div>
          )}
        </CardFooter>
      </Card>

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
              confirming purchase of {form.getValues("token_amount")} tokens to{" "}
              {form.getValues("wallet_address")}
            </p>
            <p>
              Total Price (ETH):{" "}
              {formatEther(calculateTotalPrice(form.getValues("token_amount")))}
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
                  You have successfully minted {form.getValues("token_amount")}{" "}
                  AQUA tokens to wallet address{" "}
                  {form.getValues("wallet_address")}.
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
    </section>
  );
};

export default TokenBuyPage;
