import React from "react";
import { UserProposals } from "./_components/UserProposals";
import { OtherProposals } from "./_components/OtherProposals";

const ProposalsPage = () => {
  return (
    <section className="flex size-full flex-col gap-8 py-8">
      {/* user proposals */}
      <UserProposals />

      {/* other proposals */}
      <OtherProposals />
    </section>
  );
};

export default ProposalsPage;
