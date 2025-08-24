import { Method } from "@/shared/api/util/fetcher";

export const chat = {
  // 나의 개인 채팅방 조회
  getPrivateChatRoom: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/private-chat-rooms`,
    method: Method.GET,
  }),
  // 개인 채팅방 생성 및 유무 조회 (통합)
  getPrivateChatRoomByUser: (userId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/private-chat-rooms`,
    method: Method.GET,
  }),
  // 개인 채팅방 메시지 조회
  getPrivateChatRoomMessages: (privateChatRoomId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/private-chat-rooms/${privateChatRoomId}/messages`,
    method: Method.GET,
  }),
  // 개인 채팅방 입장
  postEnterPrivateChatRoom: (privateChatRoomId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/private-chat-rooms/${privateChatRoomId}`,
    method: Method.POST,
  }),
  // 개인 채팅방 퇴장
  deletePrivateChatRoom: (privateChatRoomId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/private-chat-rooms/${privateChatRoomId}/members`,
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

// 스터디 채팅
export const studyChat = {
  // 스터디 채팅방 목록 조회
  getStudyChatRoom: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/chat-rooms`,
    method: Method.GET,
  }),
  // 스터디 채팅방 메시지 조회
  getStudyChatRoomMessages: (studyChatRoomId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/chat-rooms/${studyChatRoomId}/messages`,
    method: Method.GET,
  }),
};
