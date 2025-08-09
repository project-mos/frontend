import { Method } from "@/shared/api/util/fetcher";

export const chat = {
  // 개인 채팅방 조회
  getPrivateChatRoom: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/private-chat-rooms`,
    method: Method.GET,
  }),
  // 개인 채팅방 유무 조회
  getSearchPrivateChatRoom: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/private-chat-rooms/search`,
    method: Method.GET,
  }),
  // 개인 채팅방 생성
  postPrivateChatRoom: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/private-chat-rooms`,
    method: Method.POST,
  }),
  // 개인 채팅방 입장
  postEnterPrivateChatRoom: (privateChatRoomId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/private-chat-rooms/${privateChatRoomId}`,
    method: Method.POST,
  }),
  // 개인 채팅방 퇴장
  deletePrivateChatRoom: (privateChatRoomId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/private-chat-rooms/${privateChatRoomId}`,
    method: Method.DELETE,
  }),
};

// 모집
export const recruitmentChat = {
  // 모집글 채팅방 생성
  postRecruitmentChatRoom: (studyId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/recruitment-chat-rooms`,
    method: Method.POST,
  }),
  // 모집글 채팅 조회
  getRecruitmentChatRoom: (recruitmentChatRoomId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/recruitment-chat-rooms/${recruitmentChatRoomId}/messages`,
    method: Method.GET,
  }),
};
