/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios';


const formSchema = z.object({
  email: z.string().min(3).email(),
  password: z.string().min(6),
})

export function LoginForm() {
  
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(`/api/auth`, values)

      if (response.data.success) {
        window.location.href = '/class'
      }
    } catch (error: any) {
      console.log(error)
      // th

      form.setError('email', {
        type: 'manual',
        message: `Invalid email or password `
      })
    }
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mb-3">
            <FormMessage />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="emodu@example.com" {...field} />
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
                    <Input
                      type="password"
                      placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="border w-full bg-blue-600 text-white font-bold">
              {
                form.formState.isSubmitting ? 'Signing in...' : 'Login'
              }</Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline w-full">
            Sign up
          </Link>

          {/* <Link href="/protected" className="underline w-full">
            Protected
          </Link> */}
        </div>
      </CardContent>
    </Card>
  )
}
