import { useQuery } from "@tanstack/react-query";
import { getRequirements } from "@/entities/study/requirement/api/requirement.api";
import { GetStudyRequirementsResponse } from "@/entities/study/requirement/api/requirement.api.types";

// 쿼리 키 생성 함수
export const RequirementsQueryKey = (studyId: string) => [
  "study",
  "requirements",
  studyId,
];

// 스터디 요구사항 조회 훅
export const useGetRequirements = (studyId: string) => {
  return useQuery<GetStudyRequirementsResponse>({
    queryKey: RequirementsQueryKey(studyId),
    queryFn: () => getRequirements(studyId),
    enabled: !!studyId,
    retry: false,
  });
};
