"use client";

// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import CreateClassModal from "@/components/modals/create-class-modal";
import CreateMeetingModal from "../modals/create-meeting-modal";
import ExportModal from "../modals/export-modal";
import DeleteMeetingDialog from "../modals/delete-dialog";
import DeleteClassDialog from "../modals/delete-class-dialog";
import EditClassModal from "../modals/edit-class-modal";
import EditMeetingModal from "../modals/edit-meeting-modal";
import CreateFeedbackModal from "../modals/create-feedback-modal";
import JoinClassModal from "../modals/join-class.modal";
import ConfirmActionModal from "../modals/confirm-action-modal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateClassModal />
      <EditClassModal />
      <CreateMeetingModal />
      <ExportModal />
      <EditMeetingModal />
      <DeleteMeetingDialog />
      <DeleteClassDialog />
      <CreateFeedbackModal />
      <JoinClassModal />
      <ConfirmActionModal />
    </>
  );
}
