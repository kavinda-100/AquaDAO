"use client";

import React from "react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useWriteContract } from "wagmi";
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
        onSuccess() {
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
    <div className="border-border/50 hover:bg-accent/50 flex max-h-[600px] min-h-[300px] w-full max-w-[600px] min-w-[300px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border p-4 text-center transition">
      <PlusIcon
        className="text-primary h-6 w-6"
        onClick={openProposalFormHandler}
      />
      <h2 className="font-bold" onClick={openProposalFormHandler}>
        Create a Proposal
      </h2>

      {/* Proposal form dialog */}
      <Dialog open={openProposalForm} onOpenChange={setOpenProposalForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Proposal</DialogTitle>
            <DialogDescription>
              Please fill out the form to create a new proposal.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Enter a brief description"
                          {...field}
                          disabled={isCreatingProposal}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your proposal description.
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
                      <FormLabel>Duration (in days)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          disabled={isCreatingProposal}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the duration for your proposal. (e.g: 1 for 1
                        day | 7 for 7 days)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between px-2">
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="cursor-pointer"
                    onClick={() => setOpenProposalForm(false)}
                    disabled={isCreatingProposal}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={isCreatingProposal}
                  >
                    {isCreatingProposal ? (
                      <Loader2Icon className="size-5 animate-spin" />
                    ) : (
                      "Create Proposal"
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isCreatingProposalSuccess
                ? "Proposal Created"
                : "Proposal Creation Failed"}
            </DialogTitle>
          </DialogHeader>
          <div>
            <p>
              {isCreatingProposalSuccess
                ? "Your proposal has been created successfully."
                : creatingProposalError}
            </p>
            {isCreatingProposalSuccess && hash && (
              <p>
                Transaction Hash:{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {hash.slice(0, 25)}...{hash.slice(-4)}
                </a>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenFinalResultDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
