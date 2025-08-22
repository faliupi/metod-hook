import { BaseListResponse, BaseResponse } from "@/constants/types";
import apiClient from "@/lib/axios-instance";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export interface ClassData {
  id: string
  name: string
  description: string
  classCode: string
  defaultMeetingLink?: string
  createdAt: string
  updatedAt: string
  userId: string
  user: User
  meetings: Meeting[]
  members: Member[]

}
export interface Member {
  role: string
  userId: string
  joinAt: string
  user: User
}


export interface User {
  fullname: string
  email: string
  avatar: string
}

export interface Meeting {
  id: string
  meetingCode: string
  name: string
  subject: string
  description: string
  link: string
  isStarted: boolean
  isEnded: boolean
  startedAt: string
  createdAt: string
  updatedAt: string
  createdBy: string
  classId: string
}

export interface CreateClassDto {
  name: string
  description: string
  defaultMeetingLink: string
}

export interface EditClassDto {
  name: string
  description: string
}

type ClassResponse = BaseListResponse<ClassData>;
type ClassDetailResponse = BaseResponse<ClassData>;


export const useGetClass = () => {
  return useQuery<ClassResponse>({
    queryKey: ["classes"],
    queryFn: async () => {
      return apiClient.get('/class')
        .then((res) => res.data);
    },
  })
};

export const useGetClassById = (id: string) => {
  return useQuery<ClassDetailResponse, AxiosError>({
    queryKey: ["classes", id],
    queryFn: async () => {
      return apiClient.get(`/class/${id}`)
        .then((res) => res.data);
    },
  })
};
export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateClassDto) => {
      return apiClient.post(`${BASE_URL}/class/create`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useEditClass = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EditClassDto) => {
      return apiClient.patch(`${BASE_URL}/class/${id}`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export const useJoinClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { classCode: string }) => {
      return apiClient.post(`${BASE_URL}/class/join`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return apiClient.delete(`${BASE_URL}/class/${id}`)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export const useAddCoTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { classId: string, userId: string }) => {
      return apiClient.patch(`${BASE_URL}/class/add-coteacher/${data.classId}`, {
        userId: data.userId
      })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export const useRemoveCoTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { classId: string, userId: string }) => {
      return apiClient.patch(`${BASE_URL}/class/remove-coteacher/${data.classId}`, {
        userId: data.userId
      })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}