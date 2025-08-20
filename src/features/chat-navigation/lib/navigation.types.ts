import { PrivateChatRoom } from "@/entities/chat/api/chat.api.types";

export type ChatNavigationView = "list" | "study-inquiry" | "chatroom";

export interface NavigationState {
  currentView: ChatNavigationView;
  stack: NavigationStackItem[];
  selectedStudy?: StudyInquiryRoom;
  selectedChatRoom?: PrivateChatRoom;
}

export interface NavigationStackItem {
  view: ChatNavigationView;
  title: string;
  data?: StudyInquiryRoom | PrivateChatRoom;
}

export interface StudyInquiryRoom {
  studyId: string;
  studyName: string;
  inquiries: StudyInquiryUser[];
  createdAt: string;
  updatedAt: string;
}

export interface StudyInquiryUser {
  userId: string;
  userName: string;
  userAvatar: string;
  roomId: string; // 실제 채팅방 ID
  lastMessage: {
    content: string;
    type: "text" | "image" | "file";
    timestamp: string;
  };
  unreadCount: number;
  inquiryDate: string;
  inquiryStatus: "active" | "resolved" | "pending";
}
