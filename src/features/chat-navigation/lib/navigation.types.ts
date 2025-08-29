import { PrivateChatRoom, StudyChatRoom } from "@/entities/chat/api/chat.api.types";

export type ChatNavigationView = "list" | "chatroom";

export interface NavigationState {
  currentView: ChatNavigationView;
  stack: NavigationStackItem[];
  selectedChatRoom?: PrivateChatRoom | StudyChatRoom;
}

export interface NavigationStackItem {
  view: ChatNavigationView;
  title: string;
  data?: PrivateChatRoom | StudyChatRoom;
}


