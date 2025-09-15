"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProposalType } from "@/app/types";
import type { LucideIcon } from "lucide-react";
import { ProposalDisplayCard } from "../_components/ProposalDisplayCard";
import { useGetActiveProposals } from "@/hooks/useGetActiveProposals";
import { useGetExecutedProposals } from "@/hooks/useGetExecutedProposals";
import { useGetFailedProposals } from "@/hooks/useGetFailedProposals";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Vote,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const AllProposals = () => {
  const {
    proposals: activeProposals,
    isPending: isActivePending,
    isError: isActiveError,
    error: activeError,
  } = useGetActiveProposals();
  const {
    proposals: executedProposals,
    isPending: isExecutedPending,
    isError: isExecutedError,
    error: executedError,
  } = useGetExecutedProposals();
  const {
    proposals: failedProposals,
    isPending: isFailedPending,
    isError: isFailedError,
    error: failedError,
  } = useGetFailedProposals();

  return (
    <section className="from-background via-background/95 to-primary/5 min-h-screen bg-gradient-to-br p-6 lg:p-8">
      <div className="mx-auto w-full space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          {/* Back Navigation */}
          <Link
            href="/proposals"
            className="group text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Proposals</span>
          </Link>

          {/* Main Header */}
          <div className="space-y-4 text-center">
            <div className="bg-primary/10 border-primary/20 text-primary mb-4 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold">
              <Vote className="h-4 w-4" />
              All Governance Proposals
            </div>
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
              <span className="from-primary to-primary bg-gradient-to-r via-blue-500 bg-clip-text text-transparent">
                Proposal Hub
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Explore all governance proposals across different states and
              participate in AquaDAO&apos;s decentralized decision-making
              process
            </p>
          </div>

          {/* Stats Overview */}
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-card/50 border-border/50 flex items-center gap-3 rounded-lg border p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Active</p>
                <p className="text-lg font-bold">
                  {activeProposals?.length ?? 0}
                </p>
              </div>
            </div>
            <div className="bg-card/50 border-border/50 flex items-center gap-3 rounded-lg border p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Executed</p>
                <p className="text-lg font-bold">
                  {executedProposals?.length ?? 0}
                </p>
              </div>
            </div>
            <div className="bg-card/50 border-border/50 flex items-center gap-3 rounded-lg border p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Failed</p>
                <p className="text-lg font-bold">
                  {failedProposals?.length ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="active" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="bg-muted/50 grid h-12 w-full max-w-md grid-cols-3 backdrop-blur-sm">
              <TabsTrigger
                value="active"
                className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-200"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Active</span>
              </TabsTrigger>
              <TabsTrigger
                value="executed"
                className="flex items-center gap-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-800 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-200"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Executed</span>
              </TabsTrigger>
              <TabsTrigger
                value="failed"
                className="flex items-center gap-2 data-[state=active]:bg-red-100 data-[state=active]:text-red-800 dark:data-[state=active]:bg-red-900/30 dark:data-[state=active]:text-red-200"
              >
                <XCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Failed</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active">
            <TabContentWrapper
              proposals={activeProposals}
              isPending={isActivePending}
              iserror={isActiveError}
              error={activeError?.message ?? "Unknown error"}
              Icon={Clock}
              stateType="active"
            />
          </TabsContent>
          <TabsContent value="executed">
            <TabContentWrapper
              proposals={executedProposals}
              isPending={isExecutedPending}
              iserror={isExecutedError}
              error={executedError?.message ?? "Unknown error"}
              Icon={CheckCircle2}
              stateType="executed"
            />
          </TabsContent>
          <TabsContent value="failed">
            <TabContentWrapper
              proposals={failedProposals}
              isPending={isFailedPending}
              iserror={isFailedError}
              error={failedError?.message ?? "Unknown error"}
              Icon={XCircle}
              stateType="failed"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AllProposals;

const TabContentWrapper = ({
  proposals,
  Icon,
  isPending,
  iserror,
  error,
  stateType,
}: {
  proposals: ProposalType[];
  isPending: boolean;
  iserror: boolean;
  error: string;
  Icon: LucideIcon | null;
  stateType: "active" | "executed" | "failed";
}) => {
  // Loading state
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-16">
        <div className="relative">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <div className="border-primary/20 absolute inset-0 h-8 w-8 animate-pulse rounded-full border-2" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-foreground text-lg font-semibold">
            Loading proposals...
          </h3>
          <p className="text-muted-foreground text-sm">
            Fetching {stateType} proposals from the blockchain
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (iserror) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-foreground text-lg font-semibold">
            Error loading proposals
          </h3>
          <p className="text-muted-foreground max-w-md text-sm">
            {error ||
              "Something went wrong while fetching the proposals. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (proposals.length === 0) {
    const emptyStateConfig = {
      active: {
        icon: Clock,
        title: "No Active Proposals",
        description:
          "There are currently no active proposals awaiting votes. Check back later or create a new proposal.",
        color: "blue",
      },
      executed: {
        icon: CheckCircle2,
        title: "No Executed Proposals",
        description:
          "No proposals have been successfully executed yet. Active proposals that reach consensus will appear here.",
        color: "green",
      },
      failed: {
        icon: XCircle,
        title: "No Failed Proposals",
        description:
          "No proposals have failed yet. Proposals that don't reach consensus or expire will appear here.",
        color: "red",
      },
    };

    const config = emptyStateConfig[stateType];
    const IconComponent = config.icon;

    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-16">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full ${
            config.color === "blue"
              ? "bg-blue-100 dark:bg-blue-900/30"
              : config.color === "green"
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-red-100 dark:bg-red-900/30"
          }`}
        >
          <IconComponent
            className={`h-8 w-8 ${
              config.color === "blue"
                ? "text-blue-600 dark:text-blue-400"
                : config.color === "green"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
            }`}
          />
        </div>
        <div className="max-w-md space-y-2 text-center">
          <h3 className="text-foreground text-lg font-semibold">
            {config.title}
          </h3>
          <p className="text-muted-foreground text-sm">{config.description}</p>
        </div>
      </div>
    );
  }

  // Proposals grid
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-border/50 flex items-center gap-3 border-b pb-4">
        {Icon && (
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              stateType === "active"
                ? "bg-blue-100 dark:bg-blue-900/30"
                : stateType === "executed"
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-red-100 dark:bg-red-900/30"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${
                stateType === "active"
                  ? "text-blue-600 dark:text-blue-400"
                  : stateType === "executed"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
              }`}
            />
          </div>
        )}
        <div>
          <h2 className="text-foreground text-xl font-semibold capitalize">
            {stateType} Proposals
          </h2>
          <p className="text-muted-foreground text-sm">
            {proposals.length} proposal{proposals.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Proposals Grid */}
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {proposals.map((proposal) => (
          <ProposalDisplayCard key={proposal.id} {...proposal} />
        ))}
      </div>
    </div>
  );
};
