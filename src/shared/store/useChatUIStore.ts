import { create } from "zustand";
import { GetPrivateChatRoomByUserResponse } from "@/entities/chat/api/chat.api.types";

interface ChatUIStore {
  isOpen: boolean;
  privateChatRoomData?: GetPrivateChatRoomByUserResponse;
  tempChatRoomName?: string; // 임시 채팅방 이름 (처음 생성 시에만 사용)
  openChat: (response: GetPrivateChatRoomByUserResponse, tempChatRoomName?: string) => void;
  openChatList: () => void; // 채팅 목록만 열기
  closeChat: () => void;
}

export const useChatUIStore = create<ChatUIStore>((set) => ({
  isOpen: false,
  privateChatRoomData: undefined,
  tempChatRoomName: undefined,
  openChat: (response, tempChatRoomName) => set({ 
    isOpen: true, 
    privateChatRoomData: response, 
    tempChatRoomName 
  }),
  openChatList: () => set({ 
    isOpen: true, 
    privateChatRoomData: undefined, 
    tempChatRoomName: undefined 
  }),
  closeChat: () => set({ 
    isOpen: false, 
    privateChatRoomData: undefined, 
    tempChatRoomName: undefined 
  }),
}));
