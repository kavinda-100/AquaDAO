"use client";

import React from "react";
import Link from "next/link";
import { ProposalDisplayCard } from "./ProposalDisplayCard";
import {
  ArrowRight,
  FileText,
  AlertCircle,
  Loader2,
  Vote,
  ExternalLink,
  UserPlus2,
} from "lucide-react";
import { useGetActiveProposals } from "@/hooks/useGetActiveProposals";

export const OtherProposals = () => {
  const { proposals, isPending, isError, error } = useGetActiveProposals();

  return (
    <section className="from-background via-background/95 to-primary/5 relative w-full space-y-8 rounded-xl bg-gradient-to-br p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="from-primary/20 border-primary/30 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-gradient-to-br to-blue-500/20">
              <UserPlus2 className="text-primary h-6 w-6" />
            </div>
            <div>
              <h2 className="from-primary bg-gradient-to-r to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
                All Proposals
              </h2>
              <p className="text-muted-foreground text-sm">
                Manage and track other governance proposals
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/proposals/all/"
          className="group bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:gap-3"
        >
          <span>See All</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Content Grid */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Loading State */}
        {isPending && (
          <div className="col-span-full flex flex-col items-center justify-center space-y-4 py-16">
            <div className="from-primary/20 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-blue-500/20">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
            <div className="space-y-1 text-center">
              <p className="text-muted-foreground text-lg font-semibold">
                Loading your proposals...
              </p>
              <p className="text-muted-foreground/80 text-sm">
                Please wait while we fetch your data
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="col-span-full flex flex-col items-center justify-center space-y-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-300 bg-gradient-to-br from-red-100 to-rose-100 dark:border-red-700 dark:from-red-900/30 dark:to-rose-900/30">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="max-w-md space-y-2 text-center">
              <p className="text-lg font-semibold text-red-800 dark:text-red-200">
                Failed to load proposals
              </p>
              <p className="text-sm text-red-700 dark:text-red-300">
                {error?.message ??
                  "An unexpected error occurred while fetching your proposals"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-800 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isPending && !isError && proposals.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center space-y-4 py-16">
            <div className="from-muted/50 to-muted/80 border-muted flex h-20 w-20 items-center justify-center rounded-full border-2 bg-gradient-to-br">
              <FileText className="text-muted-foreground h-10 w-10" />
            </div>
            <div className="max-w-sm space-y-2 text-center">
              <p className="text-muted-foreground text-lg font-semibold">
                No proposals yet
              </p>
              <p className="text-muted-foreground/80 text-sm">
                You haven&apos;t created any governance proposals. Start by
                creating your first proposal to participate in DAO governance.
              </p>
            </div>
            <div className="text-muted-foreground mt-4 flex items-center gap-2 text-xs">
              <Vote className="h-4 w-4" />
              <span>Get started with governance</span>
            </div>
          </div>
        )}

        {/* Proposals List */}
        {!isPending && !isError && proposals.length > 0 && (
          <>
            {proposals.slice(0, 4).map((proposal) => (
              <ProposalDisplayCard key={proposal.id} {...proposal} />
            ))}
          </>
        )}
      </div>

      {/* Stats Footer - Show when there are proposals */}
      {!isPending && !isError && proposals.length > 0 && (
        <div className="bg-muted/30 border-border/50 flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="text-primary h-4 w-4" />
              <span className="text-muted-foreground">Total Proposals:</span>
              <span className="font-semibold">{proposals.length}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Vote className="h-4 w-4 text-green-600" />
              <span className="text-muted-foreground">Showing:</span>
              <span className="font-semibold">
                {Math.min(3, proposals.length)} of {proposals.length}
              </span>
            </div>
          </div>

          {proposals.length > 3 && (
            <Link
              href="/proposals/all/user"
              className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <span>View all proposals</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
      )}
    </section>
  );
};
