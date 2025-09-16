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
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Loader2,
  Play,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Hash,
} from "lucide-react";

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
      <div className="flex items-center gap-4 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="font-semibold text-green-800 dark:text-green-200">
            Proposal Executed
          </h3>
          <p className="text-sm text-green-600 dark:text-green-400">
            This proposal has already been successfully executed and
            implemented.
          </p>
        </div>
      </div>
    );
  }

  // id not executed
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <div className="mb-3 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h4 className="font-medium text-blue-800 dark:text-blue-200">
            Ready to Execute
          </h4>
        </div>
        <p className="mb-4 text-sm text-blue-700 dark:text-blue-300">
          As the proposal creator, you can execute this proposal to implement
          the changes on-chain.
        </p>

        <button
          onClick={() => setOpenAlert(true)}
          className="group inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isExecutingPending}
        >
          {isExecutingPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Executing...</span>
            </>
          ) : (
            <>
              <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>Execute Proposal</span>
            </>
          )}
        </button>
      </div>

      {/* Confirmation Alert */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="sm:max-w-lg">
          <AlertDialogHeader className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <AlertDialogTitle className="text-center text-xl">
              Confirm Proposal Execution
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 text-center">
              <p>
                This action cannot be undone. This will execute the proposal
                with ID:
                <span className="font-mono font-semibold"> #{Number(id)}</span>
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-left">
                <p className="mb-2 text-sm font-medium">Please review:</p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Proposal will be permanently executed</li>
                  <li>• Changes will be implemented on-chain</li>
                  <li>• This action requires gas fees</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel disabled={isExecutingPending} className="flex-1">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={executeProposal}
              disabled={isExecutingPending}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              {isExecutingPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Executing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  <span>Yes, Execute</span>
                </div>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Final Result Dialog (Success or Error) */}
      <Dialog open={openResult} onOpenChange={setOpenResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-4 text-center">
            <div className="from-primary/20 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r to-blue-500/20">
              {isExecutingSuccess ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <DialogTitle className="text-xl">
              {isExecutingSuccess
                ? "Proposal Executed Successfully!"
                : "Execution Failed"}
            </DialogTitle>
            <DialogDescription className="space-y-4 text-center">
              {isExecutingSuccess ? (
                <div className="space-y-3">
                  <p className="text-green-700 dark:text-green-300">
                    The proposal with ID #{Number(id)} has been executed
                    successfully and is now live on the blockchain.
                  </p>
                  {hash && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Hash className="text-muted-foreground h-4 w-4" />
                        <span className="text-sm font-medium">
                          Transaction Hash
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted flex-1 truncate rounded px-2 py-1 font-mono text-xs">
                          {hash && hash.slice(0, 10) + "..." + hash.slice(-8)}
                        </code>
                        <a
                          href={`https://sepolia.etherscan.io/tx/${hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm">View</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-red-700 dark:text-red-300">
                    Failed to execute the proposal. Please try again or contact
                    support if the issue persists.
                  </p>
                  {errorMessage && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 text-red-600 dark:text-red-400" />
                        <div>
                          <p className="text-sm font-medium text-red-800 dark:text-red-200">
                            Error Details:
                          </p>
                          <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                            {errorMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setOpenResult(false)}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Warning Dialog */}
      <Dialog open={openWarning} onOpenChange={setOpenWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <DialogTitle className="text-xl">Execution Warning</DialogTitle>
            <DialogDescription className="space-y-4 text-center">
              <p className="text-amber-700 dark:text-amber-300">
                {warningMessage ?? "There is a warning you should be aware of."}
              </p>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                <h4 className="mb-3 font-medium text-amber-800 dark:text-amber-200">
                  Current Voting Status:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                    <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Votes For
                      </p>
                      <p className="font-semibold text-green-800 dark:text-green-200">
                        {Number(voteFor)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                    <ThumbsDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="text-xs text-red-600 dark:text-red-400">
                        Votes Against
                      </p>
                      <p className="font-semibold text-red-800 dark:text-red-200">
                        {Number(voteAgainst)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setOpenWarning(false);
                setWarningMessage(null);
              }}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
