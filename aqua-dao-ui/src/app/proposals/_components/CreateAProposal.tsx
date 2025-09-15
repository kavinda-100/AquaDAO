"use client";

import React from "react";
import {
  Loader2Icon,
  PlusIcon,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Vote,
  Lightbulb,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useWriteContract, useReadContract } from "wagmi";
import { QueryClient } from "@tanstack/react-query";
import AquaDaoABI from "@/abi/AquaDAO.json";
import { AQUA_DAO_ADDRESS } from "@/abi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  duration: z.number().min(1, { message: "Duration must be at least 1 day." }),
});

export const CreateAProposal = () => {
  const [openProposalForm, setOpenProposalForm] = React.useState(false); // for create proposal form dialog
  const [openFinalResultDialog, setOpenFinalResultDialog] =
    React.useState(false); // for final result dialog
  const [isCreatingProposalSuccess, setIsCreatingProposalSuccess] =
    React.useState(false); // to check if creating proposal is success or not
  const [creatingProposalError, setCreatingProposalError] = React.useState<
    string | null
  >(null); // to store error message

  // wagmi write contract
  const {
    data: hash,
    writeContract,
    isPending: isCreatingProposal,
  } = useWriteContract();

  // wagmi read contract to get the latest proposals after creating a new one
  const { queryKey } = useReadContract();
  // Tanstack query
  const queryClient = new QueryClient();

  const openProposalFormHandler = () => {
    setOpenProposalForm(true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      duration: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // handle form submission
    writeContract(
      {
        address: AQUA_DAO_ADDRESS as `0x${string}`,
        abi: AquaDaoABI.abi,
        functionName: "createProposal",
        args: [values.description, BigInt(values.duration)],
      },
      {
        async onSuccess() {
          await queryClient.invalidateQueries({ queryKey });
          setOpenProposalForm(false);
          setIsCreatingProposalSuccess(true);
          setCreatingProposalError(null);
          setOpenFinalResultDialog(true);
        },
        onError(error) {
          setOpenProposalForm(false);
          setIsCreatingProposalSuccess(false);
          setCreatingProposalError(error?.message || "Something went wrong");
          setOpenFinalResultDialog(true);
        },
      },
    );
  }

  return (
    <div className="group border-border/50 from-card/50 to-primary/5 relative flex min-h-[350px] max-w-[600px] min-w-[300px] cursor-pointer flex-col items-center justify-center gap-6 overflow-hidden rounded-xl border bg-gradient-to-br p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Gradient overlay for hover effect */}
      <div className="from-primary/10 absolute inset-0 rounded-xl bg-gradient-to-br to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon container */}
      <div
        className="from-primary/20 border-primary/30 relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 bg-gradient-to-br to-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        onClick={openProposalFormHandler}
      >
        <PlusIcon className="text-primary h-10 w-10 transition-transform duration-300 group-hover:rotate-90" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 space-y-3"
        onClick={openProposalFormHandler}
      >
        <h2 className="from-primary bg-gradient-to-r to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
          Create a Proposal
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xs leading-relaxed">
          Submit new governance proposals to shape the future of AquaDAO
        </p>
        <div className="text-primary/80 mt-4 flex items-center justify-center gap-2 text-sm">
          <Vote className="h-4 w-4" />
          <span className="font-medium">Start Governance Process</span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-20 transition-opacity duration-300 group-hover:opacity-40">
        <Lightbulb className="text-primary h-6 w-6" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-20 transition-opacity duration-300 group-hover:opacity-40">
        <FileText className="h-5 w-5 text-blue-500" />
      </div>

      {/* Proposal form dialog */}
      <Dialog open={openProposalForm} onOpenChange={setOpenProposalForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader className="pb-4 text-center">
            <div className="from-primary/20 border-primary/30 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-gradient-to-br to-blue-500/20">
              <FileText className="text-primary h-8 w-8" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              Create a Proposal
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base">
              Fill out the details below to submit your governance proposal
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-semibold">
                        <FileText className="text-primary h-4 w-4" />
                        Proposal Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Describe your proposal in detail..."
                          {...field}
                          disabled={isCreatingProposal}
                          className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none"
                        />
                      </FormControl>
                      <FormDescription className="text-sm">
                        Provide a clear and comprehensive description of your
                        proposal
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-semibold">
                        <Calendar className="text-primary h-4 w-4" />
                        Voting Duration (Days)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          placeholder="e.g., 7"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          disabled={isCreatingProposal}
                          className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 h-12"
                        />
                      </FormControl>
                      <FormDescription className="text-sm">
                        How long should the voting period last? (1-30 days
                        recommended)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenProposalForm(false)}
                    disabled={isCreatingProposal}
                    className="h-11 px-6"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreatingProposal}
                    className="from-primary hover:from-primary/90 h-11 bg-gradient-to-r to-blue-500 px-6 font-semibold hover:to-blue-500/90"
                  >
                    {isCreatingProposal ? (
                      <>
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Vote className="mr-2 h-4 w-4" />
                        Create Proposal
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Final result dialog */}
      <Dialog
        open={openFinalResultDialog}
        onOpenChange={setOpenFinalResultDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="pb-4 text-center">
            <div
              className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 ${
                isCreatingProposalSuccess
                  ? "border-green-300 bg-gradient-to-br from-green-100 to-emerald-100 dark:border-green-700 dark:from-green-900/30 dark:to-emerald-900/30"
                  : "border-red-300 bg-gradient-to-br from-red-100 to-rose-100 dark:border-red-700 dark:from-red-900/30 dark:to-rose-900/30"
              }`}
            >
              {isCreatingProposalSuccess ? (
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
              )}
            </div>
            <DialogTitle
              className={`text-2xl font-bold ${
                isCreatingProposalSuccess
                  ? "text-green-800 dark:text-green-200"
                  : "text-red-800 dark:text-red-200"
              }`}
            >
              {isCreatingProposalSuccess
                ? "🎉 Proposal Created Successfully!"
                : "❌ Proposal Creation Failed"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {isCreatingProposalSuccess && (
              <div className="space-y-4 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="space-y-2 text-center">
                  <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                    Congratulations! 🎊
                  </p>
                  <p className="text-green-700 dark:text-green-300">
                    Your governance proposal has been successfully submitted to
                    the DAO.
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

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <div className="mb-2 flex items-center gap-2">
                    <Vote className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      What&apos;s Next?
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Community members can now vote on your proposal. The voting
                    period will last for the duration you specified.
                  </p>
                </div>
              </div>
            )}

            {!isCreatingProposalSuccess && (
              <div className="space-y-4 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-6 dark:border-red-800 dark:from-red-900/20 dark:to-rose-900/20">
                <div className="space-y-2 text-center">
                  <p className="text-lg font-semibold text-red-800 dark:text-red-200">
                    Proposal Creation Failed
                  </p>
                  <p className="text-red-700 dark:text-red-300">
                    We encountered an error while creating your proposal.
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
                    {creatingProposalError ?? "Unknown error occurred"}
                  </p>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                    <div className="text-sm">
                      <p className="mb-1 font-medium text-blue-800 dark:text-blue-200">
                        Troubleshooting Tips:
                      </p>
                      <ul className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                        <li>• Check your wallet connection</li>
                        <li>
                          • Ensure you have sufficient tokens to create
                          proposals
                        </li>
                        <li>
                          • Verify your description meets minimum requirements
                        </li>
                        <li>• Try again with a different duration</li>
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
                setOpenFinalResultDialog(false);
                if (isCreatingProposalSuccess) {
                  form.reset(); // Reset form only on success
                }
              }}
              className={`h-12 w-full font-semibold ${
                isCreatingProposalSuccess
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                  : "from-primary hover:from-primary/90 bg-gradient-to-r to-blue-500 hover:to-blue-500/90"
              }`}
            >
              {isCreatingProposalSuccess ? (
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
  );
};
