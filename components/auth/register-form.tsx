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
import { toast } from "sonner"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const formSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().min(3).email(),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
})

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.passwordConfirmation) {
      return form.setError('passwordConfirmation', {
        type: 'manual',
        message: 'Password confirmation does not match'
      })
    }

    try {
      const payload = {
        email: values.email,
        password: values.password,
        fullname: values.fullname
      }
      const response = await axios.post(`${BASE_URL}/auth/register`, payload)
      // console.log(response.)
      if (response.status === 201) {
        toast.success('Account created successfully')
        // setIsLoading(false)
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
        // window.location.href = '/login'
      }

    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your information below to register your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mb-3">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
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
                      placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button

              type="submit"
              className="w-full bg-blue-500 text-white font-bold"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Creating account...' : 'Register'}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline w-full">
            Sign in
          </Link>

        </div>
      </CardContent>
    </Card>
  )
}
