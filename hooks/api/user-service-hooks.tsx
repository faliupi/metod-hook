import { BaseResponse } from "@/constants/types";
import apiClient from "@/lib/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




export interface Data {
  id: string
  email: string
  fullname: string
  avatar: string
  isVerified: boolean
  verificationToken: string
  createdAt: string
  updatedAt: string
}

export interface UpdateProfileDto {
  id?: string
  email?: string
  fullName?: string
  avatar?: string
  password?: string
}

type GetProfileResponse = BaseResponse<Data>


export const useGetProfile = () => {
  return useQuery<GetProfileResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      return apiClient.get('/auth/profile')
        .then((res) => res.data);
    },
  })
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn :  (data: UpdateProfileDto) => {
      return apiClient.patch('/users/update', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  })
};