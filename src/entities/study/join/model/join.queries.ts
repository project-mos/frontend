import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getJoins,
  postJoin,
  patchJoin,
  getMyJoinedStudies,
  getMyApplyStatus,
} from "@/entities/study/join/api/join.api";
import {
  JoinsRequest,
  PostJoin,
} from "@/entities/study/join/api/join.api.types";

// 지원 목록
export const JoinListQueryKey = (params: JoinsRequest) => [
  "study",
  "join",
  params,
];

// 나의 스터디 지원 상태 조회
export const useGetJoins = (params: JoinsRequest) => {
  return useQuery({
    queryKey: JoinListQueryKey(params),
    queryFn: () => getJoins(params),
    enabled: !!params, // 상태가 있을 때만 조회
    retry: false,
  });
};

// 지원 등록
export const usePostJoin = (params: JoinsRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studyId, data }: { studyId: string; data: PostJoin }) =>
      postJoin(studyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: JoinListQueryKey(params), // 목록을 다시 불러오게
      });
    },
  });
};

// 지원 수정 (패치)
export const usePatchJoin = (params: JoinsRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studyId,
      studyJoinId,
    }: {
      studyId: string;
      studyJoinId: string;
    }) => patchJoin(studyId, studyJoinId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: JoinListQueryKey(params), // 목록을 다시 불러오게
      });
    },
  });
};

// 참여 중인 스터디
export const MyJoinedStudiesQueryKey = (userId: number) => [
  "users",
  "joinedStudies",
  userId,
];

export const useGetMyJoinedStudies = (userId: number) => {
  return useQuery({
    queryKey: MyJoinedStudiesQueryKey(userId),
    queryFn: () => getMyJoinedStudies(userId),
    enabled: !!userId,
    retry: false,
  });
};

// 나의 지원 현황
export const MyApplyStatusQueryKey = ["users", "myApplyStatus"];

export const useGetMyApplyStatus = () => {
  return useQuery({
    queryKey: MyApplyStatusQueryKey,
    queryFn: getMyApplyStatus,
    retry: false,
  });
};
