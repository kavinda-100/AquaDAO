"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  wallet_address: z
    .string()
    .min(42, "Wallet address must be 42 characters")
    .max(42, "Wallet address must be 42 characters")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum wallet address format"),
});

const TokenByPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wallet_address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="flex size-full flex-col items-center justify-center px-4">
      <Card className="w-full max-w-xl min-w-md">
        <CardHeader>
          <CardTitle>Get AQUA Tokens</CardTitle>
          <CardDescription>
            Fill out the form below to receive your AQUA tokens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="wallet_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public wallet address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Buy AQUA Tokens</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  );
};

export default TokenByPage;
