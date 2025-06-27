import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  getSchedules,
  getStudySchedule,
  postStudySchedule,
  putStudySchedule,
  deleteStudySchedule,
} from "@/entities/study/schedule/api/schedule.api";
import { PostStudyScheduleResponse } from "@/entities/study/schedule/api/schedule.api.types";

// QueryKey
export const SchedulesQueryKey = ["study", "schedules"];
export const StudyScheduleQueryKey = (studyId: number) => [
  "study",
  "schedule",
  studyId,
];

// 전체 일정 조회
export const useGetSchedules = () => {
  return useQuery({
    queryKey: SchedulesQueryKey,
    queryFn: getSchedules,
  });
};

// 스터디별 일정 조회
export const useGetStudySchedule = (studyId: number) => {
  return useQuery({
    queryKey: StudyScheduleQueryKey(studyId),
    queryFn: () => getStudySchedule(studyId),
    enabled: !!studyId,
    staleTime: 3600,
    retry: false,
    // 최신순으로 정렬
    select: (data) =>
      [...data].sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
      ),
  });
};

// 일정 생성
export const usePostStudySchedule = (
  studyId: number,
  // Accept additional options, merging them with the default type
  options?: Omit<
    UseMutationOptions<
      unknown, // TData: The type of the data returned by mutationFn
      Error, // TError: The type of the error thrown by mutationFn
      PostStudyScheduleResponse, // TVariables: The type of the variables passed to mutationFn
      unknown // TContext: The type of the context for the onMutate function
    >,
    "mutationFn" // Omit properties we're defining internally
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostStudyScheduleResponse) =>
      postStudySchedule(studyId, data),
    onSuccess: (data, variables, context) => {
      // Invalidate queries as default behavior
      queryClient.invalidateQueries({
        queryKey: StudyScheduleQueryKey(studyId),
      });
      // Call the user-provided onSuccess if it exists
      options?.onSuccess?.(data, variables, context);
    },
    // Spread any additional options provided by the user
    ...options,
  });
};

// 일정 수정
export const usePutStudySchedule = (
  studyId: number,
  options?: Omit<
    UseMutationOptions<
      unknown, // TData: The type of the data returned by mutationFn
      Error, // TError: The type of the error thrown by mutationFn
      {
        scheduleId: number;
        data: PostStudyScheduleResponse;
      }, // TVariables: The type of the variables passed to mutationFn
      unknown // TContext: The type of the context for the onMutate function
    >,
    "mutationFn" // Omit properties we're defining internally
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      scheduleId,
      data,
    }: {
      scheduleId: number;
      data: PostStudyScheduleResponse;
    }) => putStudySchedule(studyId, scheduleId, data),
    onSuccess: (data, variables, context) => {
      // Invalidate queries as default behavior
      queryClient.invalidateQueries({
        queryKey: StudyScheduleQueryKey(studyId),
      });
      // Call the user-provided onSuccess if it exists
      options?.onSuccess?.(data, variables, context);
    },
    // Spread any additional options provided by the user
    ...options,
  });
};

//  일정 삭제
export const useDeleteStudySchedule = (
  studyId: number,
  options?: Omit<
    UseMutationOptions<
      unknown, // TData: The type of the data returned by mutationFn
      Error, // TError: The type of the error thrown by mutationFn
      number, // TVariables: The type of the variables passed to mutationFn
      unknown // TContext: The type of the context for the onMutate function
    >,
    "mutationFn" // Omit properties we're defining internally
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (scheduleId: number) =>
      deleteStudySchedule(studyId, scheduleId),
    onSuccess: (data, variables, context) => {
      // Invalidate queries as default behavior
      queryClient.invalidateQueries({
        queryKey: StudyScheduleQueryKey(studyId),
      });
      // Call the user-provided onSuccess if it exists
      options?.onSuccess?.(data, variables, context);
    },
    // Spread any additional options provided by the user
    ...options,
  });
};
