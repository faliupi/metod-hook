/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseResponse } from "@/constants/types";
import apiClient from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";



interface Feedback {
  name: string
  email: string
  message: string
  rating: number
}

type FeedbackSuccessResponse = BaseResponse<Feedback>

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation<FeedbackSuccessResponse, Error, any>({
    mutationFn: async (data) => {
      return apiClient.post(`/feedbacks/create`, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};