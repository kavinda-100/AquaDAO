"use client";

import React from "react";
import Link from "next/link";
import { CreateAProposal } from "./CreateAProposal";
import { useGetUserProposals } from "@/hooks/useGetUserProposals";
import { useAccount } from "wagmi";

export const UserProposals = () => {
  const account = useAccount();
  const { proposals, isPending, isError, error } = useGetUserProposals(
    account.address,
  ); // TODO: get user address from wallet
  return (
    <section className="flex w-full flex-col gap-4 px-3">
      <Link href="/proposals/all/user" className="flex justify-end">
        See All
      </Link>
      <section className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* create proposal button */}
        <CreateAProposal />

        {/* user proposals list */}
        {/* only show 3 proposals (with the button grid will be fill for 4) */}
        {isPending && <p>Loading...</p>}
        {isError && <p>Error: {error?.message}</p>}
        {!isPending && !isError && <p>{proposals?.length}</p>}
      </section>
    </section>
  );
};
