import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  EditRuleRequest,
  editRules,
  getRules,
} from "@/entities/study/rule/api/rules.api";

export const RulesQueryKey = (studyId: number) => ["study", "rules", studyId];

export const useGetStudyRules = (studyId: number) => {
  return useQuery({
    queryKey: RulesQueryKey(studyId),
    queryFn: () => getRules(studyId), // getRules 함수 사용
    enabled: !!studyId,
    retry: false,
  });
};

export const useEditStudyRules = ({ studyId, rules }: EditRuleRequest) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => editRules({ studyId, rules }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RulesQueryKey(Number(studyId)),
      });
    },
  });
};
