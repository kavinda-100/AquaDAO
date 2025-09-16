"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWriteContract } from "wagmi";
import { AQUA_DAO_ADDRESS } from "@/abi";
import AquaDaoABI from "@/abi/AquaDAO.json";
import { Button } from "@/components/ui/button";

export const ExecuteTheProposal = ({
  id,
  voteFor,
  voteAgainst,
  isExecuted,
}: {
  id: bigint;
  voteFor: bigint;
  voteAgainst: bigint;
  isExecuted: boolean;
}) => {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openResult, setOpenResult] = React.useState(false);
  const [openWarning, setOpenWarning] = React.useState(false);
  const [isExecutingSuccess, setIsExecutingSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [warningMessage, setWarningMessage] = React.useState<string | null>(
    null,
  );

  const {
    data: hash,
    writeContract,
    isPending: isExecutingPending,
  } = useWriteContract();

  const executeProposal = () => {
    // Check if there are any votes
    if (voteFor === BigInt(0) && voteAgainst === BigInt(0)) {
      setWarningMessage("No votes have been cast for this proposal.");
      setOpenAlert(false);
      setOpenWarning(true);
      return;
    }
    // write to the contract
    writeContract(
      {
        address: AQUA_DAO_ADDRESS as `0x${string}`,
        abi: AquaDaoABI.abi,
        functionName: "executeTheProposal",
        args: [id],
      },
      {
        onSuccess() {
          setIsExecutingSuccess(true);
          setErrorMessage(null);
          setOpenAlert(false);
          setOpenResult(true);
        },
        onError(error) {
          setIsExecutingSuccess(false);
          setErrorMessage(error?.message || "Something went wrong");
          setOpenAlert(false);
          setOpenResult(true);
        },
      },
    );
  };

  // if the proposal is already executed
  if (isExecuted) {
    return (
      <div className="rounded bg-gray-100 p-4 text-center text-gray-700">
        This proposal has already been executed.
      </div>
    );
  }

  // id not executed
  return (
    <div>
      <button
        onClick={() => setOpenAlert(true)}
        className="cursor-pointer rounded bg-green-400 px-4 py-2 text-white transition hover:bg-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none"
      >
        Execute Proposal
      </button>

      {/* Confirmation Alert */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will execute the proposal with
              ID: {id}.
              <br />
              Please ensure you have reviewed all details before proceeding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isExecutingPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={executeProposal}
              disabled={isExecutingPending}
            >
              {isExecutingPending ? "Executing..." : "Yes, Execute"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Final Result Dialog (Success or Error) */}
      <Dialog open={openResult} onOpenChange={setOpenResult}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isExecutingSuccess
                ? "Proposal Executed Successfully!"
                : "Execution Failed"}
            </DialogTitle>
            <DialogDescription>
              {isExecutingSuccess ? (
                <div>
                  The proposal with ID: {id} has been executed successfully.
                  <br />
                  Transaction Hash:{" "}
                  <a
                    href={`https://sepolia.etherscan.io/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {hash}
                  </a>
                </div>
              ) : (
                <div className="text-red-500">
                  Failed to execute the proposal.{" "}
                  {errorMessage && (
                    <>
                      <br />
                      Error: {errorMessage}
                    </>
                  )}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={"secondary"} onClick={() => setOpenResult(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Warning Dialog */}
      <Dialog open={openWarning} onOpenChange={setOpenWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Warning</DialogTitle>
            <DialogDescription className="text-yellow-600">
              {warningMessage ?? "There is a warning you should be aware of."}
            </DialogDescription>
            <div className="mt-4 flex flex-col gap-3 rounded bg-yellow-100 p-4 text-black">
              <p>Vote For: {Number(voteFor)}</p>
              <p>Vote Against: {Number(voteAgainst)}</p>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"secondary"}
              onClick={() => {
                setOpenWarning(false);
                setWarningMessage(null);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
