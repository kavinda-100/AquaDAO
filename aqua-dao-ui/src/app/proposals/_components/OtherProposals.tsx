"use client";

import Link from "next/dist/client/link";
import React from "react";

export const OtherProposals = () => {
  return (
    <section className="flex w-full flex-col gap-4 px-3">
      <Link href="/proposals/all" className="flex justify-end">
        See All
      </Link>

      {/* Other Proposals List only show 4 */}
      <section className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Render other proposals here */}
      </section>
    </section>
  );
};
