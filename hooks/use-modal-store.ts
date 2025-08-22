/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
export type ModalType =
  | "createClass"
  | "createMeeting"
  | "joinClass"
  | "settingClass"
  | "editClass"
  | "editMeeting"
  | "createMaterial"
  | "createAssignment"
  | "createMeetingLink"
  | "editPost"
  | "exportMeetingData"
  | "deleteMeetingDialog"
  | "deleteClassDialog"
  | "feedbackDialog"
  | "confirmDialog"

type ModalData = {
  classId?: string;
  id?: string;
  classPost?: any;
  type?: "edit" | "create" | "delete";
}

type MeetingModalData ={
  name?: string;
  description?: string;
  link?: string;
  meetingCode?: string;
  countOfMeetings?: number;
  subject?: string;
  createdBy: string;
}

type ClassModalData = {
  name?: string;
  description?: string;
  link?: string;
  meetCode?: string;
  classCode?: string;
  countOfMeetings?: number;
  subject?: string;
  defaultMeetingLink?: string;
}

type FeedbackModalData = {
  body?: string;
  email?: string;
}

type ConfirmModalData = {
  title?: string;
  body?: string;
  onConfirm?: () => void;
}

export interface ModalStore {
  data: ModalData & MeetingModalData & ClassModalData & FeedbackModalData & ConfirmModalData;
  isOpen: boolean;
  modalType: ModalType ;
  onClose: () => void;
  // onOpen: (type: ModalType, data?: ModalData) => void;
  onOpen: (type: ModalType, data?: ModalData & MeetingModalData & ClassModalData & FeedbackModalData & any) => void;
  setModalType: (type: ModalType) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalType: "createClass",
  isOpen: false,
  data: {} as ModalData & MeetingModalData & ClassModalData & FeedbackModalData,
  onOpen: (type, data = {}) => set({ isOpen: true, modalType: type, data }),
  onClose: () => set({ isOpen: false }),
  setModalType: (type) => set({ modalType: type }),
}));
