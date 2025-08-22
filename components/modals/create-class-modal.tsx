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
// import { useModalStore } from "@/hooks/use-modal-store";
import { Textarea } from "../ui/textarea";
// import { createClassAction } from "@/app/action";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/hooks/use-modal-store";
import { useCreateClass } from "@/hooks/api/class-service-hooks";

const CreateClassModal = () => {
  const { isOpen, modalType, onClose } = useModalStore();
  const [loading, setLoading] = useState(false);
  const isModalOpen = isOpen && modalType === "createClass";
  const queryClient = useQueryClient();
  const createClass = useCreateClass();


  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Class name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "description must be at least 2 characters.",
    }),
    defaultMeetingLink: z.string().url({
      message: "Google meet link must be a valid url.",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      defaultMeetingLink: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    // const getCode = values?.defaultMeetingLink.match(/[a-z]{3}-[a-z]{4}-[a-z]{3}/g) || "";
    createClass.mutate(values,{
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["classList"] });
        toast.success("Class created successfully");
        setLoading(false);
        onClose();
      },
      onError: () => {
        toast.error("Failed to create class");  
        setLoading(false);
      }
    })
    // createClassAction({
    //   name: values.name,
    //   description: values.description,
    //   link: values.link,
    //   meetCode: getCode[0],
    // })
    //   .then(() => {
    //     form.reset();
    //     queryClient.invalidateQueries({ queryKey: ["classList"] });
    //     toast.success("Class created successfully");
    //     setLoading(false);
    //     onClose();
    //   })
    //   .catch(() => {
    //     toast.error("Failed to create class");
    //   });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-gray-800 dark:text-white
       text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create class
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-gray-300">
                      Class Name (required)
                    </FormLabel>
                    <FormMessage />
                    <span className="text-red-500">
                        {errors.name?.message}
                      </span>
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
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
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="defaultMeetingLink"
                render={({ field,  }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-gray-300">
                      Google Meet Link (required)
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 dark:placeholder:gray-400 dark:text-white"
                        placeholder="Example: https://meet.google.com/xxx-xxx-xxx"
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
                  form.formState.isSubmitting
                }
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassModal;
