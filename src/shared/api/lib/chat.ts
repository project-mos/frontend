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
