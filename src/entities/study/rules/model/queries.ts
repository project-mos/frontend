import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  EditRuleRequest,
  editRules,
  getRules,
} from "@/entities/study/rules/api";
import { API_ENDPOINT } from "@/shared/api/lib";

export const useGetStudyRules = (studyId: number) => {
  return useQuery({
    queryKey: API_ENDPOINT.rules.getStudyRules(studyId).queryKey,
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
        queryKey: API_ENDPOINT.rules.getStudyRules(Number(studyId)).queryKey,
      });
    },
  });
};
