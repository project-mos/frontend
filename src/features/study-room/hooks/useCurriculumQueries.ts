import { getCurriculum } from "@/entities/study/curriculum/api/curriculum.api";
import { useQuery } from "@tanstack/react-query";

// 현재 커리큘럼 조회
export function useGetCurriculums(studyId: number) {
  return useQuery({
    queryKey: ["curriculums", studyId],
    queryFn: () => getCurriculum(studyId),
    staleTime: 3600,
    enabled: !!studyId,
    retry: false,
  });
}
