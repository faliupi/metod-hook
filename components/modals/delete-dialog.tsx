"use client";

import { Button } from "../ui/button";
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
import { useDeleteMeeting } from "@/hooks/api/meeting-service-hooks";
const DeleteMeetingDialog = () => {
  const { isOpen, modalType, onClose, data } = useModalStore();
  const [loading, setLoading] = useState(false);
  const isModalOpen = isOpen && modalType === "deleteMeetingDialog";
  const router = useRouter();
  // const EMOVIEW_CODE = data.meetingCode as string;
  const deleteMeeting = useDeleteMeeting();
  const handleDelete = async () => {
    setLoading(true);
    deleteMeeting.mutate(data.id as string, {
      onSuccess: () => {
        router.refresh();
        toast.success("Meeting deleted successfully");
        setLoading(false);
        handleClose();
      },
      onError: () => {
        toast.error("Failed to delete meeting");
        setLoading(false);
      },
    });
    // await removeMeeting({
    //   emoviewCode: EMOVIEW_CODE,
    // }).then(() => {
    //   toast.success("Meeting deleted successfully");
    //   router.refresh();
    //   setLoading(false);
    //   handleClose();
    // }).catch(() => {
    //   toast.error("Failed to delete meeting");

    // });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden
        dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700
        ">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Delete Item
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mx-5">
            <p className="text-gray-500 text-center">
              Are you sure you want to delete this meeting?
              After deletion, it cannot be recovered.
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
    </>
  );
};

export default DeleteMeetingDialog;
