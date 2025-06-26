import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
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
export const JoinListQueryKey = (params?: JoinsRequest) => [
  "study",
  "join",
  params || "",
];

// 나의 스터디 지원 상태 조회
export const useGetJoins = (params: JoinsRequest = "") => {
  return useQuery({
    queryKey: JoinListQueryKey(params),
    queryFn: () => getJoins(params),
    retry: false,
  });
};

// 지원 등록
export const usePostJoin = ({
  params,
  options,
}: {
  params?: JoinsRequest;
  options: UseMutationOptions<
    PostJoin,
    unknown,
    { studyId: string; data: PostJoin },
    unknown
  >;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: ({ studyId, data }: { studyId: string; data: PostJoin }) =>
      postJoin(studyId, data),
    // 기본 onSuccess
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: JoinListQueryKey(params),
      });
      // options에 onSuccess가 있다면 실행
      options?.onSuccess?.(...args);
    },
  });
};

// 지원 수정 (패치)
export const usePatchJoin = ({
  params,
  options,
}: {
  params?: JoinsRequest;
  options: UseMutationOptions<
    unknown,
    unknown,
    { studyId: string; studyJoinId: string },
    unknown
  >;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: JoinListQueryKey(params),
      });
      // options에 onSuccess가 있다면 실행
      options?.onSuccess?.(...args);
    },
    mutationFn: ({
      studyId,
      studyJoinId,
    }: {
      studyId: string;
      studyJoinId: string;
    }) => patchJoin(studyId, studyJoinId),
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
