"use client";

import { PlusIcon } from "lucide-react";
import React from "react";

export const CreateAProposal = () => {
  return (
    <div className="border-border/50 hover:bg-accent/50 flex max-h-[600px] min-h-[300px] w-full max-w-[600px] min-w-[300px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border p-4 text-center transition">
      <PlusIcon className="text-primary h-6 w-6" />
      <h2 className="font-bold italic">Create a Proposal</h2>
    </div>
  );
};
