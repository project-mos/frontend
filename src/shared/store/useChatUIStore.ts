import { create } from "zustand";
import { ChatRoomPreview } from "@/entities/chat/lib/mock/chat.mock";
import { GetPrivateChatRoomByUserResponse } from "@/entities/chat/api/chat.api.types";

interface ChatUIStore {
  isOpen: boolean;
  targetChatRoom?: ChatRoomPreview;
  privateChatRoomData?: GetPrivateChatRoomByUserResponse; // 실제 채팅방 데이터 추가
  openChat: (room?: ChatRoomPreview, privateChatRoomData?: GetPrivateChatRoomByUserResponse) => void;
  closeChat: () => void;
}

export const useChatUIStore = create<ChatUIStore>((set) => ({
  isOpen: false,
  targetChatRoom: undefined,
  privateChatRoomData: undefined,
  openChat: (room, privateChatRoomData) => set({ 
    isOpen: true, 
    targetChatRoom: room, 
    privateChatRoomData 
  }),
  closeChat: () => set({ 
    isOpen: false, 
    targetChatRoom: undefined, 
    privateChatRoomData: undefined 
  }),
}));
