import { BaseListResponse, BaseResponse } from "@/constants/types";
import apiClient from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
// export interface Root {
//   success: boolean
//   pagination: Pagination
//   message: string
//   data: Daum[]
// }

// export interface Pagination {
//   totalItems: number
//   currentPage: number
//   totalPages: number
//   pageLeft: number
// }

export interface ValenceArousal {
  id: string
  valence: number
  arousal: number
  emotionPercentages: number
  emotion: string
  meetingCode: string
  createdAt: string
  updatedAt: string
  userId: string
  user: User
}

export interface User {
  id: string
  email: string
  fullname: string
}



export interface ValenceArousalAnalytics {
  emotions: Emotion[]
  totalRecords: number
  uniqueParticipants: number
}

export interface Emotion {
  emotion: string
  percentage: number
  emotionPercentage: number
  valence: number
  arousal: number
}


type GetValenceArousalDataByUserListResponse = BaseListResponse<ValenceArousal>
type GetValenceArousalAnalyticsResponse = BaseResponse<ValenceArousalAnalytics>
export const useGetValenceArousalDataByUser = (userId: string) => {
  return useQuery<GetValenceArousalDataByUserListResponse>({
    queryKey: ["valence-arousal"],
    queryFn: async () => {
      return apiClient.get(`/valence-arousal/user/${userId}`)
        .then((res) => res.data);
    },
  })
}

export const useGetValenceArousalAnalytics = (meetingCode: string) => {
  return useQuery<GetValenceArousalAnalyticsResponse>({
    queryKey: ["valence-arousal-analytics"],
    queryFn: async () => {
      return apiClient.get(`/valence-arousal/analytics`,{
        params: {
          meetingCode
        }
      })
        .then((res) => res.data);
    },
  })
}