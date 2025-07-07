import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { editRules, getRules } from "@/entities/study/overview/api/rules.api";
import { EditRuleRequest } from "../api/rules.api.type";

export const RulesQueryKey = (studyId: string) => ["study", "rules", studyId];

export const useGetStudyRules = (studyId: string) => {
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
        queryKey: RulesQueryKey(studyId),
      });
    },
  });
};
