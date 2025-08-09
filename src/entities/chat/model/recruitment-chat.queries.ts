import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  postRecruitmentChatRoom,
  getRecruitmentChatRoom,
} from "@/entities/chat/api/recruitment-chat.api";
import {
  GetRecruitmentChatRoomResponse,
  PostRecruitmentChatRoomResponse,
} from "@/entities/chat/api/recruitment-chat.api.types";

// Query Key 생성
export const RecruitmentChatRoomQueryKey = {
  base: ["chat", "recruitmentRoom"] as const,
  detail: (id: number) => [...RecruitmentChatRoomQueryKey.base, id] as const,
};

// 모집글 채팅방 생성
export const usePostRecruitmentChatRoom = (
  options?: Omit<
    UseMutationOptions<PostRecruitmentChatRoomResponse, unknown, number>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studyId: number) => postRecruitmentChatRoom(studyId),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: RecruitmentChatRoomQueryKey.base,
      });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};

// 모집글 채팅 조회
export const useGetRecruitmentChatRoom = (
  recruitmentChatRoomId: number,
  options?: Omit<
    UseQueryOptions<GetRecruitmentChatRoomResponse>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: RecruitmentChatRoomQueryKey.detail(recruitmentChatRoomId),
    queryFn: () => getRecruitmentChatRoom(recruitmentChatRoomId),
    retry: false,
    ...options,
  });
};
