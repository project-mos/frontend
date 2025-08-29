import {
  PrivateChatRoom,
  StudyChatRoom,
} from "@/entities/chat/api/chat.api.types";

/**
 * 채팅방 목록을 검색어로 필터링하는 순수 함수
 * @param chatRooms 채팅방 목록 (개인/스터디 혼용)
 * @param searchQuery 검색어
 * @returns 필터링된 채팅방 목록
 */
export const filterChatRooms = (
  chatRooms: (PrivateChatRoom | StudyChatRoom)[],
  searchQuery: string
): (PrivateChatRoom | StudyChatRoom)[] => {
  if (!searchQuery.trim()) {
    return chatRooms;
  }

  const query = searchQuery.toLowerCase();

  return chatRooms.filter((room) => {
    // 채팅방 이름으로 검색
    const matchesChatRoomName = room.chatName.toLowerCase().includes(query);

    // 마지막 메시지 내용으로 검색
    const matchesLastMessage = room.lastMessage.toLowerCase().includes(query);

    return matchesChatRoomName || matchesLastMessage;
  });
};

/**
 * 검색어가 유효한지 확인하는 함수
 * @param query 검색어
 * @returns 유효성 여부
 */
export const isValidSearchQuery = (query: string): boolean => {
  return query.trim().length > 0;
};

/**
 * 검색어를 정규화하는 함수 (공백 제거, 소문자 변환)
 * @param query 검색어
 * @returns 정규화된 검색어
 */
export const normalizeSearchQuery = (query: string): string => {
  return query.trim().toLowerCase();
};
