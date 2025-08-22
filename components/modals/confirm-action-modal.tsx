/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useModalStore } from "@/hooks/use-modal-store";
// import { createClassAction } from "@/app/action";
// import { toast } from "sonner";
import { useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/hooks/use-modal-store";
// import { useJoinClass } from "@/hooks/api/class-service-hooks";

const ConfirmActionModal = () => {
  const { isOpen, modalType, onClose, data } = useModalStore();
  const [loading] = useState(false);
  const isModalOpen = isOpen && modalType === "confirmDialog";
  // const queryClient = useQueryClient();
  // const joinClass = useJoinClass();

  const formSchema = z.object({
    classCode: z.string().min(2, {
      message: "Class code must be at least 2 characters.",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classCode: "",
    },
  });

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   setLoading(true);
  //   console.log("values", values);
  //   joinClass.mutate(values, {
  //     onSuccess: () => {
  //       form.reset();
  //       queryClient.invalidateQueries({ queryKey: ["classList"] });
  //       toast.success("Class joined successfully");
  //       setLoading(false);
  //       onClose();
  //     },
  //     onError: (error: any) => {
  //       console.log("error", error);
  //       if (error.status === 400) {
  //         toast.error("You already joined this class");
  //         setLoading(false);
  //         return;
  //       } else if (error.status === 404) {
  //         toast.error("Class not found. Please check the class code and try again.");
  //         setLoading(false);
  //         return;
  //       }
  //       toast.error("Failed to join class");
  //       setLoading(false);
  //     },
  //   });
  // };

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
            {data.title}
          </DialogTitle>
        </DialogHeader>

        <div>
          <p className="px-6 text-center">{data.body || "Are you sure want to perform this action?"}</p>
        </div>

        <DialogFooter className="bg-gray-100 px-6 py-4 dark:bg-gray-900 dark:text-white">
        <Button
            variant="outline"
            onClick={handleClose}
            className=" dark:text-white"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={data.onConfirm}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            {loading ? "Processing..." : "Confirm"}
          </Button>
         
        </DialogFooter>

        {/* <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2 px-6">
              <FormField
                control={form.control}
                name="classCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-gray-300">
                      Class Code (required)
                    </FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 *:
                        dark:placeholder:gray-400 dark:text-white
                        "
                        placeholder="Enter class name"
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
                {loading ? "Joining..." : "Join"}
              </Button>
            </DialogFooter>
          </form>
        </Form> */}
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmActionModal;
