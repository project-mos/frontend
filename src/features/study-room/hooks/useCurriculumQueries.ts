import { getCurriculums } from "@/features/studies/services/studies.service";
import { useQuery } from "@tanstack/react-query";

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
