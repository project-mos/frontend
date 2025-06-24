import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  });
};

// 일정 생성
export const usePostStudySchedule = (studyId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostStudyScheduleResponse) =>
      postStudySchedule(studyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: StudyScheduleQueryKey(studyId),
      });
    },
  });
};

// 일정 수정
export const usePutStudySchedule = (studyId: number, scheduleId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostStudyScheduleResponse) =>
      putStudySchedule(studyId, scheduleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: StudyScheduleQueryKey(studyId),
      });
    },
  });
};

//  일정 삭제
export const useDeleteStudySchedule = (studyId: number, scheduleId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteStudySchedule(studyId, scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: StudyScheduleQueryKey(studyId),
      });
    },
  });
};
