"use client";

import React from "react";
import { CreateAProposal } from "./CreateAProposal";
import Link from "next/link";

export const UserProposals = () => {
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
      </section>
    </section>
  );
};
