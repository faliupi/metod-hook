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
import { useEffect } from "react";
import { useModalStore } from "@/hooks/use-modal-store";
import { useUpdateMeeting } from "@/hooks/api/meeting-service-hooks";

const EditMeetingModal = () => {
  const { isOpen, modalType, onClose, data } = useModalStore();
  const isModalOpen = isOpen && modalType === "editMeeting";
  const router = useRouter();
  const updateMeeting = useUpdateMeeting(data.id as string);
  
  // console.log('data', data.createdBy);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Class name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "description must be at least 2 characters.",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // emoviewCode: "",
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {


    updateMeeting.mutate(values, {
      onSuccess: () => {
        router.refresh();
        toast.success("Meeting updated successfully");
        handleClose();
      },
      onError: () => {
        toast.error("Failed to update meeting");
      }
    })

  };

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name as string);
      form.setValue("description", data.description as string);
    }
  }, [data, form]);


  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden dark:bg-gray-800 dark:text-white">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Edit meeting
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2 px-6">
              {/* validation error */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
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
                        placeholder="Enter class name"
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
                        placeholder="Enter class description"
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
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"

              >
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMeetingModal;
