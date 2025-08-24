import { useQuery, UseQueryOptions } from "@tanstack/react-query";
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
  messages: (studyChatRoomId: string) =>
    ["chat", "studyRoom", studyChatRoomId, "messages"] as const,
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

// 스터디 채팅방 메시지 조회
export const useGetStudyChatRoomMessages = (
  studyChatRoomId: string,
  options?: Omit<
    UseQueryOptions<GetStudyChatRoomMessagesResponse>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: StudyChatRoomQueryKey.messages(studyChatRoomId),
    queryFn: () => getStudyChatRoomMessages(studyChatRoomId),
    retry: false,
    enabled: Boolean(studyChatRoomId),
    ...options,
  });
};
