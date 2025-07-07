export type GetPrivateChatRoomResponse = PrivateChatRoom[];

export interface PrivateChatRoom {
  counterpartId: number;
  privateChatRoomId: number;
  lastMessage: string;
  lastMessageAt: string;
}

export interface postPrivateChatRoomResponse {
  receiverId: number;
}
