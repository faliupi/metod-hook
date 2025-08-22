"use client";

import { Button } from "../ui/button"
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { useModalStore } from "@/hooks/use-modal-store";
import { useDeleteClass } from "@/hooks/api/class-service-hooks";
// import { removeClass } from "@/lib/api/class";
const DeleteClassDialog = () => {
  const { isOpen, modalType, onClose, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const isModalOpen = isOpen && modalType === "deleteClassDialog";
  const router = useRouter();
  const deleteClass = useDeleteClass();

  const handleDelete = async () => {
    setLoading(true);
    deleteClass.mutate(data.id as string, {
      onSuccess: () => {
        router.refresh();
        // router.push("/dashboard/teacher/c");
        toast.success("Class deleted successfully");
        setLoading(false);
        handleClose();
      },
      onError: () => {
        toast.error("Failed to delete class");
        setLoading(false);
      },
    });
    // await removeClass(data.meetCode as string)
    //   .then(() => {
    //     // router.push("/dashboard/teacher");
    //     router.refresh();
    //     router.push("/dashboard/teacher/c");
    //     toast.success("Class deleted successfully");
    //     setLoading(false);
    //     handleClose();
    //   })
    //   .catch(() => {
    //     toast.error("Failed to delete class");
    //   });

  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden
        dark:bg-gray-800 dark:text-white dark:border-gray-700
        ">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Delete Class
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mx-5">
            <p className="text-gray-500 text-center">
              Are you sure you want to delete this item?
              After deleting, you will not be able to recover this class.
            </p>
          </DialogDescription>

          <DialogFooter className="mx-auto p-3">
            <Button
              variant="destructive"
              onClick={() => {
                handleDelete();
              }}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <Toaster richColors/> */}
    </>
  );
};

export default DeleteClassDialog;
