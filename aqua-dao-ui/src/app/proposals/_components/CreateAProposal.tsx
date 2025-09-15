"use client";

import React from "react";
import { PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  duration: z.number().min(1, { message: "Duration must be at least 1 day." }),
});

export const CreateAProposal = () => {
  const [openProposalForm, setOpenProposalForm] = React.useState(false);

  const openProposalFormHandler = () => {
    setOpenProposalForm(true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      duration: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="border-border/50 hover:bg-accent/50 flex max-h-[600px] min-h-[300px] w-full max-w-[600px] min-w-[300px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border p-4 text-center transition">
      <PlusIcon
        className="text-primary h-6 w-6"
        onClick={openProposalFormHandler}
      />
      <h2 className="font-bold" onClick={openProposalFormHandler}>
        Create a Proposal
      </h2>

      {/* Proposal form dialog */}
      <Dialog open={openProposalForm} onOpenChange={setOpenProposalForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Proposal</DialogTitle>
            <DialogDescription>
              Please fill out the form to create a new proposal.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Enter a brief description"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your proposal description.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (in days)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This is the duration for your proposal. (e.g: 1 for 1
                        day | 7 for 7 days)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between px-2">
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="cursor-pointer"
                    onClick={() => setOpenProposalForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="cursor-pointer">
                    Create Proposal
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
