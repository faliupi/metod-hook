import { BaseResponse } from "@/constants/types";
import apiClient from "@/lib/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// export interface Root {
//   success: boolean
//   message: string
//   data: Data
// }

export interface RecognitionData {
  recognitionStream: RecognitionStream[]
  recognitionsOverview: RecognitionsOverview
  recognitionsSummary: RecognitionsSummary
  recognitionsDetail: RecognitionsDetail
}

export interface RecognitionStream {
  id: string
  meetingCode: string
  neutral: number
  happy: number
  sad: number
  angry: number
  fearful: number
  disgusted: number
  surprised: number
  predict: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface RecognitionsOverview {
  labels: string[]
  datas: [Datas, string]
}

export interface Datas {
  neutral: number
  happy: number
  sad: number
  angry: number
  fearful: number
  disgusted: number
  surprised: number
}

export interface RecognitionsSummary {
  labels: string[]
  datas: number[]
}

export interface RecognitionsDetail {
  labels: string[]
  neutral: number[]
  happy: number[]
  sad: number[]
  angry: number[]
  fearful: number[]
  disgusted: number[]
  surprised: number[]
}


export interface RecognitionOverview {
  labels: string[]
  datas: number[]
}


type RecognitionResponse = BaseResponse<RecognitionData>
type RecognitionOverviewResponse = BaseResponse<RecognitionOverview>

export const useGetRecognitionByMeetingCode = (meetingCode: string) => {
  return useQuery<RecognitionResponse>({
    queryKey: ["recognition", { meetingCode }],
    queryFn: async () => {
      return apiClient.get(`/recognition/${meetingCode}`)
        .then((res) => res.data);
    }
  })
}

export const useGetRecognitionOverview = () => {
  return useQuery<RecognitionOverview>({
    queryKey: ["recognition"],
    queryFn: async () => {
      return apiClient.get('/recognition/overview')
        .then((res) => res.data);
    }
  })
}

export const useStartRecognition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (meetingCode: string) => {
      return apiClient.patch(`/meetings/start-recognition/${meetingCode}`)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  });
}

export const useStopRecognition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (meetingCode: string) => {
      return apiClient.patch(`/meetings/stop-recognition/${meetingCode}`)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  });
}

export interface SelectRecognitionModelDto {
  RecognitionModel: number;
}

interface SelectRecognitionModelArgs {
  meetingCode: string;
  RecognitionModel: number;
}

export const useSelectRecognitionModel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ meetingCode, RecognitionModel }: SelectRecognitionModelArgs) => {
      return apiClient.patch(`/meetings/select-recognition-model/${meetingCode}`, {
        RecognitionModel
      })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
};