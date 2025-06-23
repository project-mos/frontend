import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCurriculum,
  postCurriculum,
} from "@/entities/study/curriculum/api/curriculum.api";
import { GetCurriculumResponse } from "@/entities/study/curriculum/api/curriculum.api.types";

export const CurriculumsQueryKey = (studyId: number) => [
  "study",
  "curriculums",
  studyId,
];

// 커리큘럼 조회
export const useGetCurriculum = (studyId: number) => {
  return useQuery({
    queryKey: CurriculumsQueryKey(studyId),
    queryFn: () => getCurriculum(studyId),
    enabled: !!studyId,
    retry: false,
  });
};

// 커리큘럼 등록/수정
export const usePostCurriculum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studyId,
      data,
    }: {
      studyId: number;
      data: GetCurriculumResponse[];
    }) => postCurriculum(studyId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: CurriculumsQueryKey(variables.studyId),
      });
    },
  });
};
