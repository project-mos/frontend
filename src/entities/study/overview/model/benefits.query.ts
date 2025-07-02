import {
  getBenefits,
  postBenefit,
} from "@/entities/study/overview/api/benefits.api";
import { PostBenefitRequest } from "@/entities/study/overview/api/benefits.api.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query Key 생성 함수
export const BenefitsQueryKey = (studyId: string) => [
  "study",
  "benefits",
  studyId,
];

// 혜택 조회 쿼리
export const useGetBenefits = (studyId: string) => {
  return useQuery({
    queryKey: BenefitsQueryKey(studyId),
    queryFn: () => getBenefits(studyId),
    enabled: !!studyId,
    retry: false,
  });
};

// 혜택 등록/수정 뮤테이션
export const usePostBenefits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostBenefitRequest) => postBenefit(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: BenefitsQueryKey(variables.studyId),
      });
    },
  });
};
