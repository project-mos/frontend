import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { deleteUserSchedule, getUserSchedules, postUserSchedule, putUserSchedule } from "../api/userSchedule.api";
import { PostUserScheduleRequest } from "../api/userSchedule.api.types";

// QueryKey
export const UserSchedulesQueryKey = ["userSchedules"];
// 유저 일정 목록 조회
export const useGetUserSchedules = () => {
  return useQuery({
    queryKey: UserSchedulesQueryKey,
    queryFn: getUserSchedules,
  });
};

// 개인 일정 생성
export const useUserSchedule = (
  options?: Omit<
    UseMutationOptions<
      unknown, 
      Error, 
      PostUserScheduleRequest,
      unknown
    >,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostUserScheduleRequest) =>
      postUserSchedule(data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: UserSchedulesQueryKey,
      });
      
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

// 개인 일정 수정
export const usePutUserSchedule = (
  userScheduleId: number,
  options?: Omit<
    UseMutationOptions<
      unknown,
      Error, 
      {
        userScheduleId: number;
        data: PostUserScheduleRequest;
      }, 
      unknown
    >,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userScheduleId,
      data,
    }: {
      userScheduleId: number;
      data: PostUserScheduleRequest;
    }) => putUserSchedule(userScheduleId, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: UserSchedulesQueryKey,
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

// 개인 일정 삭제
export const useDeleteUserSchedule = (
  userScheduleId: number,
  options?: Omit<
    UseMutationOptions<
      unknown,
      Error,
      number,
      unknown 
    >,
    "mutationFn" 
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      deleteUserSchedule(userScheduleId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: UserSchedulesQueryKey,
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
