import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import {
  getStudyChatRoom,
  getStudyChatRoomMessages,
} from "@/entities/chat/api/study-chat.api";
import {
  GetStudyChatRoomResponse,
  GetStudyChatRoomMessagesResponse,
} from "@/entities/chat/api/chat.api.types";

// Query Key 생성
export const StudyChatRoomQueryKey = {
  base: ["chat", "studyRoom"] as const,
  messagesInfinite: (studyChatRoomId: string) =>
    ["chat", "studyRoom", studyChatRoomId, "messages-infinite"] as const,
};

// 스터디 채팅방 목록 조회
export const useGetStudyChatRoom = (
  options?: Omit<
    UseQueryOptions<GetStudyChatRoomResponse>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: StudyChatRoomQueryKey.base,
    queryFn: () => getStudyChatRoom(),
    retry: false,
    ...options,
  });
};

// 스터디 채팅방 메시지 조회 (무한 스크롤)
export const useGetStudyChatRoomMessages = (
  studyChatRoomId: string,
  options?: Omit<
    UseInfiniteQueryOptions<GetStudyChatRoomMessagesResponse>,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >
) => {
  return useInfiniteQuery({
    ...options,
    queryKey: StudyChatRoomQueryKey.messagesInfinite(studyChatRoomId),
    queryFn: ({ pageParam }) =>
      getStudyChatRoomMessages(
        studyChatRoomId,
        pageParam as number | undefined
      ),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.content.length > 0
        ? lastPage.lastElementId
        : undefined,
  });
};
