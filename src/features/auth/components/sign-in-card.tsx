"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { loginSchema } from "../schema";
import { useLogin } from "../api/use-login";

function SignInCard() {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values });
    //we achieved end to end type safety by this, in future if loginSchema
    //changes then it will warn us
  };

  return (
    <Card className="w-full h-full  md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl ">Welcome Back</CardTitle>
      </CardHeader>

      <div className="px-7  ">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} size="lg" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-7">
        <Button
          disabled={isPending}
          className="w-full"
          size="lg"
          variant="secondary"
        >
          <FcGoogle className=" mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          disabled={isPending}
          className="w-full"
          size="lg"
          variant="secondary"
        >
          <FaGithub className=" mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className=" p-7 flex items-center justify-center">
        <p>
          Don't have an account
          <Link href="/sign-up">
            <span className="text-blue-700">&nbsp; Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignInCard;