"use client";

import { helloAction } from '@/actions/hello-action';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactSchema } from "../schema";
import CardWrapper from "./CardWrapper";

const ContacForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: "",
      name: "",
      body: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
    setLoading(true);
    const { message } = await helloAction(data.name);
    toast({ description: message });
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Enquire about our services"
      title="Enquire"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account? Login here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testId="emailLabel">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      data-testId="emailField"
                      placeholder="Please enter your email in the following format: email@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testId="nameLabel">Name</FormLabel>
                  <FormControl>
                    <Input {...field}
                      data-testId="nameField"
                      placeholder="Please enter your full name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testId="enquiryLabel">Enquire</FormLabel>
                  <FormControl>
                    <Textarea  {...field}
                      data-testId="enquiryField"
                      placeholder="Please enter your message here" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending} data-testId="submitEnquiryButton">
            {loading ? "Loading... Please wait while your enquiry is submitted " : "Submit Enquiry"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ContacForm;