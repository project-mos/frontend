import { getCurriculums } from "@/features/studies/services/studies.service";
import {
  getStudySchedule,
  postStudySchedule,
} from "@/features/study-room/services/study-room.service";
import { PostStudySchedule } from "@/features/study-room/types/study-room.api";
import { useToast } from "@/shared/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 현재 커리큘럼 조회
export function useGetCurriculums(studyId: string) {
  return useQuery({
    queryKey: ["curriculums", studyId],
    queryFn: () => getCurriculums(studyId),
    staleTime: 3600,
    enabled: !!studyId,
    retry: false,
  });
}

// 스터디 일정 조회
export function useGetStudySchedule(studyId: string) {
  return useQuery({
    queryKey: ["studySchedule", studyId],
    queryFn: () => getStudySchedule(studyId),
    staleTime: 3600,
    enabled: !!studyId,
    retry: false,
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
