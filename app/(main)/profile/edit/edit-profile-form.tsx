'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { useGetProfile, useUpdateProfile } from '@/hooks/api/user-service-hooks'
// import { toast } from '@/components/ui/use-toast'

const profileFormSchema = z.object({
  id: z.string(),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  fullName: z
    .string()
    .min(1, { message: 'Full name is required' })
    .max(100, { message: 'Full name must not exceed 100 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .optional(),
  avatar: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can be replaced with actual data fetching logic
const defaultValues: Partial<ProfileFormValues> = {
  email: 'johndoe@example.com',
  fullName: 'John Doe',
  avatar: 'https://github.com/shadcn.png',
}

export function EditProfileForm() {
  // const router = useRouter()
  // const [avatar, setAvatar] = useState(defaultValues.avatar)
  const { data } = useGetProfile()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })
  const updateProfile = useUpdateProfile()


  function onSubmit(data: ProfileFormValues) {
    // console.log(data)
    // toast('Profile updated')
    updateProfile.mutate({
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      avatar: data.avatar,
    }, {
      onSuccess: () => {
        toast.success('Profile updated')
      },
      onError: () => {
        toast.error('Failed to update profile')
      }
    })
    // router.push('/profile')
  }
  useEffect(() => {
    if (data) {
      form.setValue('avatar', data.data.avatar)
      form.setValue('password', '')
      form.setValue('id', data.data.id)
      form.setValue('email', data.data.email)
      form.setValue('fullName', data.data.fullname)

    }
  }, [form, data])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={avatar} alt="Profile picture" />
                    <AvatarFallback>
                      {defaultValues.fullName?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                          setAvatar(e.target?.result as string)
                          field.onChange(e.target?.result as string)
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Choose a profile picture. It will be displayed as your avatar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription>
                This is the email address associated with your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormDescription>
                This is your full name as it will appear on your profile.
              </FormDescription>
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
                  placeholder="Enter new password (optional)"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Leave this blank if you don&apos;t want to change your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  )
}