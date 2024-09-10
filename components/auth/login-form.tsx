"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useAction } from "next-safe-action/hooks";
import { LoginSchema } from "@/types/Login-schema"
import { userLogin } from "@/server/action/login-action"
import { cn } from "@/lib/utils"

export function LoginForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    resetOptions: {
      keepValues: false,
    },
    
  })


  const { execute, status } = useAction(userLogin, {
    onSuccess: () => {
      console.log("success")
    },
    onError: () => {
      console.log("error")
    }
  })

  

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    execute(values)
  
    
  }


  return (
    <div className="flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent className="">


          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" autoComplete="email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className={cn(
                "w-full my-4",
                status === "executing" ? "animate-pulse" : ""
              )}> Sign In</Button>
            </form>
          </Form>

        </CardContent>
      </Card>
    </div>
  )
}