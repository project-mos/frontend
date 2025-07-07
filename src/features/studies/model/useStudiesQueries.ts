import {
  getJoins,
  patchJoin,
  postJoin,
} from "@/entities/study/join/api/join.api";
import { JoinsRequest } from "@/entities/study/join/api/join.api.type";
import { getMembers } from "@/entities/study/member/api/member.api";
import { getQuestions } from "@/entities/study/question/api/question.api";
import { getStudy } from "@/entities/study/studies/api/studies.api";
import { PostStudyJoin } from "@/entities/study/studies/api/studies.api.type";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

export function useGetStudy(studyId: string) {
  return useQuery({
    queryKey: ["study", studyId],
    queryFn: () => getStudy(studyId),
    staleTime: 3600,
    enabled: !!studyId,
  });
}

// getQuestions React Query 훅
export function useQuestions(studyId: string) {
  return useQuery({
    queryKey: ["questions", studyId],
    queryFn: () => getQuestions(studyId),
    staleTime: 10000,
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
  studyJoinStatus?: JoinsRequest;
  accessToken: string;
}) {
  return useQuery({
    queryKey: ["joins", studyJoinStatus],
    queryFn: () => getJoins(studyJoinStatus!),
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
