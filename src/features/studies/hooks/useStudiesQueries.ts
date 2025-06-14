import {
  getJoins,
  getMembers,
  getQuestions,
  patchJoin,
  postJoin,
} from "@/features/studies/services/studies.service";
import {
  GetStudyJoinsRequest,
  PostStudyJoin,
} from "@/features/studies/types/studies.api";
import useDecodeToken from "@/shared/hooks/useDecodeToken";

import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

// getQuestions React Query 훅
export function useQuestions(studyId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["questions", studyId],
    queryFn: () => getQuestions(studyId),
    staleTime: 10000,
    enabled,
  });
}
// postJoin React Query 훅
export function usePostJoin({
  studyId,
  options,
}: {
  studyId: string;
  options?: UseMutationOptions<PostStudyJoin, Error, PostStudyJoin, unknown>;
}) {
  return useMutation({
    ...options,
    mutationFn: (data: PostStudyJoin) => postJoin(studyId, data),
  });
}

// patchJoin React Query 훅
export function usePatchJoin({
  studyId,
  studyJoinId,

  options,
}: {
  studyId: string;
  studyJoinId: string;
  options?: UseMutationOptions<unknown, Error, unknown, unknown>;
}) {
  return useMutation({
    ...options,
    mutationFn: () => patchJoin(studyId, studyJoinId),
  });
}
// getJoin React Query 훅
export function useGetJoins({
  studyJoinStatus,
}: {
  studyJoinStatus?: GetStudyJoinsRequest;
  accessToken: string;
}) {
  return useQuery({
    queryKey: ["joins", studyJoinStatus],
    queryFn: () => getJoins({ studyJoinStatus }),
    staleTime: 3600,
    retry: false,
  });
}
// getMembers React Query 훅
export function useGetMembers(studyId: string) {
  return useQuery({
    queryKey: ["members", studyId],
    queryFn: () => getMembers(studyId),
    staleTime: 3600,
    enabled: !!studyId,
    retry: false,
  });
}

// 현재 스터디룸에서 나의 멤버 역할이 무엇인지 알려주는 훅
export function useMyStudyRole(studyId: string) {
  const { id: userId } = useDecodeToken();
  const { data: members } = useGetMembers(studyId);

  return members?.find((member) => member.userId === userId)
    ?.studyMemberRoleType;
}
