import { BaseListResponse, BaseResponse } from "@/constants/types";
import apiClient from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export interface DashboardCount {
  totalClassCurrentUser: number
  totalMeetingCurrentUser: number
  totalMembersOfCurrentUserClass: number
  totalParticipantsOfCurrentUserMeeting: number
}


export interface RecentMeetings {
  id: string
  meetingCode: string
  name: string
  subject: string
  description: string
  link: string
  isStarted: boolean
  isRecognitionStarted: boolean
  isRecognitionEnded: boolean
  isEnded: boolean
  selectedRecognitionModel: string
  startedAt: string 
  createdAt: string
  updatedAt: string
  createdBy: string
  classId: string
}


export interface Emotion {
  angry: number
  disgusted: number
  fearful: number
  happy: number
  neutral: number
  sad: number
  surprised: number
}




type GetDashboardCountResponse = BaseResponse<DashboardCount>
type GetRecentMeetingsListResponse = BaseListResponse<RecentMeetings>
type GetEmotionAnalyticsResponse = BaseResponse<Emotion>

export const useDashboardCount = () => {
  return useQuery<GetDashboardCountResponse>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      return apiClient.get('/dashboard/count')
        .then((res) => res.data);
    },
  })
}

export const useGetRecentMeetings = ({ page = 1, limit = 10 }: {
  page?: number,
  limit?: number
}) => {
  return useQuery<GetRecentMeetingsListResponse>({
    queryKey: ["dashboard", "recentMeetings"],
    queryFn: async () => {
      return apiClient.get(`/dashboard/recent-meetings?page=${page}&limit=${limit}`)
        .then((res) => res.data);
    },
  })
}

export const useGetEmotionDistribution = (modelName: 'EMOVALARO' | 'FACE_API') => {
  return useQuery<GetEmotionAnalyticsResponse>({
    queryKey: ["dashboard", "emotion-distribution"],
    queryFn: async () => {
      return apiClient.get('/dashboard/emotion-distribution',{
        params: {
          modelName
        }
      })
        .then((res) => {
          console.log('res', res)
          return res.data
        });
    },
  })
}
