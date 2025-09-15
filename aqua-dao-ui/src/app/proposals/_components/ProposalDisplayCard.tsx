import React from "react";
import type { ProposalType } from "@/app/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

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
  return (
    <Card>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Proposer:</span> {proposer}
          </p>
          <p>
            <span className="font-semibold">Votes For:</span> {Number(votesFor)}
          </p>
          <p>
            <span className="font-semibold">Votes Against:</span>{" "}
            {Number(votesAgainst)}
          </p>
          <p>
            <span className="font-semibold">Deadline:</span> {Number(deadline)}
          </p>
          <p>
            <span className="font-semibold">Executed:</span>{" "}
            {executed ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Proposal Passed:</span>{" "}
            {isProposalHasPassed ? "Yes" : "No"}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/proposals/${id}`}
          className="text-primary hover:underline"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};
