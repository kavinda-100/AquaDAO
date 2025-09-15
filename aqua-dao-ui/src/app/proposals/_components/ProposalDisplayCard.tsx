import React from "react";
import type { ProposalType } from "@/app/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Clock,
  User,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Calendar,
  FileText,
  AlertTriangle,
  Timer,
} from "lucide-react";
import { getTimeRemaining } from "@/lib/utils";

export const ProposalDisplayCard = ({
  id,
  description,
  proposer,
  votesFor,
  votesAgainst,
  deadline,
  executed,
  isProposalHasPassed,
}: ProposalType) => {
  // Calculate time remaining using our utility function
  const timeData = getTimeRemaining(deadline);
  const totalVotes = Number(votesFor) + Number(votesAgainst);
  const votesForPercentage =
    totalVotes > 0 ? (Number(votesFor) / totalVotes) * 100 : 0;
  const votesAgainstPercentage =
    totalVotes > 0 ? (Number(votesAgainst) / totalVotes) * 100 : 0;

  return (
    <Card className="group from-card/50 to-primary/5 border-border/50 relative flex h-full flex-col overflow-hidden bg-gradient-to-br shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Status indicator overlay */}
      <div
        className={`absolute top-0 right-0 h-full w-2 transition-opacity duration-300 ${
          executed
            ? "bg-green-500"
            : timeData.isExpired
              ? "bg-red-500"
              : timeData.isCritical
                ? "bg-orange-500"
                : timeData.isUrgent
                  ? "bg-yellow-500"
                  : "bg-blue-500"
        }`}
      />

      <CardHeader className="pb-4">
        {/* Proposal Status Badge */}
        <div className="mb-3 flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
              executed
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                : isProposalHasPassed
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                  : timeData.isExpired
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
            }`}
          >
            {executed ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Executed
              </>
            ) : isProposalHasPassed ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Passed
              </>
            ) : timeData.isExpired ? (
              <>
                <XCircle className="h-3 w-3" />
                Expired
              </>
            ) : (
              <>
                <Clock className="h-3 w-3" />
                Active
              </>
            )}
          </div>

          {/* Proposal ID */}
          <span className="text-muted-foreground font-mono text-xs">#{id}</span>
        </div>

        {/* Fixed height description container */}
        <div className="h-20 overflow-hidden">
          <CardDescription className="group-hover:text-foreground text-sm leading-relaxed transition-colors">
            <FileText className="text-primary mr-2 inline h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-3">{description}</span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Proposer */}
        <div className="flex items-center gap-2 text-sm">
          <User className="text-muted-foreground h-4 w-4 flex-shrink-0" />
          <span className="text-muted-foreground">Proposed by:</span>
          <span className="bg-muted/50 truncate rounded border px-2 py-1 font-mono text-xs">
            {proposer.slice(0, 12)}...{proposer.slice(-4)}
          </span>
        </div>

        {/* Voting Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-semibold">
              Voting Results
            </span>
            <span className="text-muted-foreground text-xs">
              {totalVotes} total votes
            </span>
          </div>

          {/* Votes For */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 flex-shrink-0 text-green-600" />
                <span className="text-sm font-medium">For</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="min-w-[2rem] text-right text-sm font-bold text-green-600">
                  {Number(votesFor)}
                </span>
                <span className="text-muted-foreground min-w-[3rem] text-right text-xs">
                  ({votesForPercentage.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="bg-muted/30 h-2 w-full rounded-full">
              <div
                className="h-2 rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${votesForPercentage}%` }}
              />
            </div>
          </div>

          {/* Votes Against */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThumbsDown className="h-4 w-4 flex-shrink-0 text-red-600" />
                <span className="text-sm font-medium">Against</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="min-w-[2rem] text-right text-sm font-bold text-red-600">
                  {Number(votesAgainst)}
                </span>
                <span className="text-muted-foreground min-w-[3rem] text-right text-xs">
                  ({votesAgainstPercentage.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="bg-muted/30 h-2 w-full rounded-full">
              <div
                className="h-2 rounded-full bg-red-500 transition-all duration-500"
                style={{ width: `${votesAgainstPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Deadline */}
        <div
          className={`flex items-center gap-2 rounded-lg border p-3 ${
            timeData.isExpired
              ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
              : timeData.isCritical
                ? "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20"
                : timeData.isUrgent
                  ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
                  : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
          }`}
        >
          {timeData.isExpired ? (
            <AlertTriangle className={`h-4 w-4 text-red-600`} />
          ) : timeData.isCritical ? (
            <Timer className={`h-4 w-4 text-orange-600`} />
          ) : (
            <Calendar className={`h-4 w-4 text-blue-600`} />
          )}
          <div className="flex-1">
            <p className="text-muted-foreground text-xs">Deadline</p>
            <p
              className={`text-sm font-semibold ${
                timeData.isExpired
                  ? "text-red-600"
                  : timeData.isCritical
                    ? "text-orange-600"
                    : timeData.isUrgent
                      ? "text-yellow-600"
                      : "text-blue-600"
              }`}
            >
              {timeData.timeLeft}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-border/50 bg-muted/20 border-t pt-4">
        <Link
          href={`/proposals/${id}`}
          className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-medium transition-colors duration-300 group-hover:gap-3"
        >
          <span>View Details</span>
          <ExternalLink className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};
