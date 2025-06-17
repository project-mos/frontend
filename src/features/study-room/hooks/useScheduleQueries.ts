import {
  deleteStudySchedule,
  getStudySchedule,
  postStudySchedule,
  putStudySchedule,
} from "@/features/study-room/services/schedule.service";
import { PostStudySchedule } from "@/features/study-room/types/study-room.api";
import { useToast } from "@/shared/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 스터디 일정 조회
export function useGetStudySchedule(studyId: string) {
  return useQuery({
    queryKey: ["studySchedule", studyId],
    queryFn: () => getStudySchedule(studyId),
    staleTime: 3600,
    enabled: !!studyId,
    retry: false,
    // 최신순으로 정렬
    select: (data) =>
      [...data].sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
      ),
  });
}

// 스터디 일정 추가
export function usePostStudySchedule(studyId: string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: ["studySchedule", studyId],
    mutationFn: (data: PostStudySchedule) => postStudySchedule(studyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["studySchedule", studyId],
      });
      toast.success("스터디 일정을 생성하였습니다!");
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
}

// 스터디 일정 수정
export function usePutStudySchedule(studyId: number) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: ["studySchedule", studyId],
    mutationFn: ({
      scheduleId,
      data,
    }: {
      scheduleId: number;
      data: PostStudySchedule;
    }) => putStudySchedule(studyId, scheduleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["studySchedule", studyId],
      });
      toast.success("스터디 일정을 수정하였습니다!");
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
}

// 스터디 일정 수정
export function useDeleteStudySchedule(studyId: number) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: ["studySchedule", studyId],
    mutationFn: ({ scheduleId }: { scheduleId: number }) =>
      deleteStudySchedule(studyId, scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["studySchedule", studyId],
      });
      toast.success("스터디 일정을 삭제하였습니다!");
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
}
