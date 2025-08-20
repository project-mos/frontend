export type GetPrivateChatRoomResponse = PrivateChatRoom[];

export interface PrivateChatRoom {
  privateChatRoomId: number;
  chatName: string;
  lastMessage: string;
  lastMessageAt: string; // yyyy-MM-dd'T'HH:mm:ss
  unreadCnt: number;
}

// 개인 채팅방 생성 및 유무 조회 응답 타입
export interface GetPrivateChatRoomByUserResponse {
  privateChatRoomId: number;
}

// 개인 채팅방 메시지 조회 응답 타입
export interface GetPrivateChatRoomMessagesResponse {
  content: PrivateChatMessage[];
  lastElementId: number;
  hasNext: boolean;
}

export interface PrivateChatMessage {
  privateChatMessageId: number;
  message: string;
  messageCreatedAt: string;
  userId: number;
  nickname: string;
}

// 스터디 채팅 타입
export type GetStudyChatRoomResponse = StudyChatRoom[];

export interface StudyChatRoom {
  studyChatRoomId: number; // privateChatRoomId → studyChatRoomId
  chatName: string;
  lastMessage: string;
  lastMessageAt: string; // yyyy-MM-dd'T'HH:mm:ss
  unreadCnt: number;
}

export interface GetStudyChatRoomMessagesResponse {
  content: StudyChatMessage[];
  lastElementId: number;
  hasNext: boolean;
}

export interface StudyChatMessage {
  studyChatMessageId: number; // privateChatMessageId → studyChatMessageId
  message: string;
  messageCreatedAt: string;
  userId: number;
  nickname: string;
}