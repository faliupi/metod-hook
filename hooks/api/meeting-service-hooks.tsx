import { BaseResponse } from "@/constants/types";
import apiClient from "@/lib/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export interface MeetingData {
  id: string
  meetingCode: string
  name: string
  subject: string
  description: string
  link: string
  isStarted: boolean
  isEnded: boolean
  isRecognitionStarted: boolean
  isRecognitionEnded: boolean
  selectedRecognitionModel: 'EMOVALARO' | 'FACE_API'
  startedAt: string
  createdAt: string
  updatedAt: string
  createdBy: string
  classId: string
  participants: Participant[]
}

export interface Participant {
  joinAt: string
  leftAt: string
  meetingId: string
  user: UserParticipant
}

export interface UserParticipant {
  id: string
  fullname: string
  email: string
  avatar: string
}


export interface CreateMeetingDto {
  name: string
  description: string
  subject?: string
  classId?: string
}

export interface UpdateMeetingDto {
  name: string
  description: string
}


type MeetingDetailResponse = BaseResponse<MeetingData>

export const useGetMeetingById = (id: string) => {
  return useQuery<MeetingDetailResponse>({
    queryKey: ["meeting", { id }],
    queryFn: async () => {
      return apiClient.get(`/meetings/${id}`)
        .then((res) => res.data);
    }
  })
};

export const useGetMeetingByMeetingCode = (meetingCode: string, 
  enabled: boolean = true
) => {
  return useQuery<MeetingDetailResponse>({
    queryKey: ["meeting", { meetingCode }],
    queryFn: async () => {
      return apiClient.get(`/meetings/meet-code/${meetingCode}`)
        .then((res) => res.data);
    },
    enabled: !!enabled
  })
}

export const useToggleStartMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (meetingCode: string) => {
      return apiClient.patch(`/meetings/toggle-start/${meetingCode}`)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  });
}

export const useToogleStartRecognition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (meetingCode: string) => {
      return apiClient.patch(`/meetings/toggle-recognition/${meetingCode}`)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  })
}

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMeetingDto) => {
      return apiClient.post(`/meetings/create`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  })
}

export const useUpdateMeeting = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMeetingDto) => {
      return apiClient.patch(`/meetings/update/${id}`, data)
        .then((res) => {
          // console.log('res', res);
          return res.data;
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  })
}

export const useDeleteMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return apiClient.delete(`/meetings/${id}`)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  })
}

// Types for meeting participant detail
export interface Recognition {
  neutral: number;
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
  predict: string;
  createdAt: string;
}

export interface EmovalaroEmotion {
  emotion: string;
  percentage: number;
  emotionPercentage: number;
  valence: number;
  arousal: number;
}

export interface MeetingParticipantDetail {
  meeting: MeetingData;
  participant: Participant;
  faceApiRecognition: Recognition[];
  emovalaroRecognition: {
    emotions: EmovalaroEmotion[];
    totalRecords: number;
  } | null;
}

export type MeetingParticipantDetailResponse = BaseResponse<MeetingParticipantDetail>;

export const useGetMeetingParticipantDetail = (
  meetingId: string,
  participantId: string,
  recognitionModel?: 'faceapi' | 'emovalaro' | 'both'
) => {
  return useQuery<MeetingParticipantDetailResponse>({
    queryKey: ["meeting-participant-detail", { meetingId, participantId, recognitionModel }],
    queryFn: async () => {
      return apiClient.get(`/meetings/${meetingId}/participant/${participantId}`,
        { params: recognitionModel ? { recognitionModel } : {} }
      ).then((res) => res.data);
    },
    enabled: !!meetingId && !!participantId,
  });
};