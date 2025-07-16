import { create } from "zustand";
import { ChatRoomPreview } from "@/entities/chat/lib/mock/chat.mock";

interface ChatUIStore {
  isOpen: boolean;
  targetChatRoom?: ChatRoomPreview;
  openChat: (room?: ChatRoomPreview) => void;
  closeChat: () => void;
}

export const useChatUIStore = create<ChatUIStore>((set) => ({
  isOpen: false,
  targetChatRoom: undefined,
  openChat: (room) => set({ isOpen: true, targetChatRoom: room }),
  closeChat: () => set({ isOpen: false, targetChatRoom: undefined }),
}));
