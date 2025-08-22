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
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { useModalStore } from "@/hooks/use-modal-store";
import { useCreateFeedback } from "@/hooks/api/feedback-service-hooks";
import Rating from "react-rating-stars-component";


const CreateFeedbackModal = () => {
  const { isOpen, modalType, onClose } = useModalStore();
  const [loading] = useState(false);
  const isModalOpen = isOpen && modalType === "feedbackDialog";
  const createFeedback = useCreateFeedback();

  const formSchema = z.object({
    message: z.string().min(2, {
      message: "Feedback must be at least 2 characters.",
    }),
    rating: z.number().min(1, {
      message: "Rating must be at least 1 star.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      rating: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      message: values.message,
      name: "Anonymous",
      email: "ronywahyu1@gmail.com",
      rating: values.rating,
    };
    const res = await createFeedback.mutateAsync(payload);

    if (res.success) {
      toast.success("Thank you for your feedback!😁");
      form.reset();
      onClose();
    }
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
            What do you think about Emodu
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2 px-6">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <Textarea
                        placeholder="Tell us everything you think about Emoview..."
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 h-52 dark:text-white dark:placeholder:text-gray-300 "
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <Rating
                        count={5}
                        size={24}
                        // isHalf={true}
                        activeColor="#ffd700"
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        // fullIcon={<i className="fa fa-star"></i>}
                        {...field}
                        onChange={(newValue: string | number) => field.onChange(newValue)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4 dark:bg-gray-900 dark:text-white">
              <Button
                variant="default"
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                disabled={loading}
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

export default CreateFeedbackModal;