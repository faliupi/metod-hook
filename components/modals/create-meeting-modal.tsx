"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useModalStore } from "@/hooks/use-modal-store";
import { useCreateMeeting } from "@/hooks/api/meeting-service-hooks";
import { useState } from "react";

const CreateMeetingModal = () => {
  const { isOpen, modalType, onClose, data } = useModalStore();
  const isModalOpen = isOpen && modalType === "createMeeting";
  const router = useRouter();
  const createMeeting = useCreateMeeting()
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Class name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "description must be at least 2 characters.",
    }),
    subject: z.string().min(2, {
      message: "subject must be at least 2 characters.",
    }),
    link: z.string().url({
      message: "Google meet link must be a valid url.",
    }).optional().or(z.literal('')),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      subject: "",
      link: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values)
    setLoading(true);
    createMeeting.mutate({
      ...values,
      classId: data.classId as string
    }, {
      onSuccess: () => {
        form.reset();
        router.refresh();
        
        toast.success("Meeting created successfully");
        setLoading(false);
        handleClose();
      },
      onError: () => {
        toast.error("Failed to create meeting");
        setLoading(false);
      }
    })
    // await createMeeting({
    //   name: values.name,
    //   description: values.description,
    //   link: data.link as string,
    //   meetCode: data.meetingCode as string,
    //   countOfMeetings: data.countOfMeetings as number,
    //   subject: data.subject as string,
    // })
    //     .then(() => {
    //       router.refresh();
    //       toast.success("Meeting created successfully");
    //       handleClose();
    //     })
    //     .catch(() => {
    //       toast.error("Failed to create meeting");
    //     });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden dark:bg-gray-800 dark:text-white">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create meeting
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2 px-6">
              {/* validation error */}
              <FormField
                control={form.control}
                name="name"
                render={({ field}) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-gray-300">
                      Meeting Name (required)
                    </FormLabel>
                    <FormMessage />
                    {/* <span className="text-red-500">
                        {errors.name?.message}
                      </span> */}
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:placeholder:gray-400 dark:text-white"
                        placeholder="Enter meeting name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-gray-300">
                      description
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Textarea
                        placeholder="Enter meeting description"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:placeholder:gray-400 dark:text-white"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-gray-300">
                      Subject
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Textarea
                        placeholder="Enter meeting subject"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:placeholder:gray-400 dark:text-white"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-gray-300">
                      Google Meet Link (optional)
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Textarea
                        placeholder="Enter meeting link"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:placeholder:gray-400 dark:text-white"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4 dark:bg-gray-900 dark:text-white">
              <Button
                variant="default"
                // disabled={
                //   !form.formState.isValid || form.formState.isSubmitting
                // }
                disabled={
                  form.formState.isSubmitting
                }
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"

              >
                {/* Create */}
                {loading ? "Creating..." : "Create"}

              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMeetingModal;
