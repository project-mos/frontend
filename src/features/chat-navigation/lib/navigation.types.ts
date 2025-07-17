import { ChatRoomPreview } from "@/entities/chat/lib/mock/chat.mock";

export type ChatNavigationView = "list" | "study-inquiry" | "chatroom";

export interface NavigationState {
  currentView: ChatNavigationView;
  stack: NavigationStackItem[];
  selectedStudy?: StudyInquiryRoom;
  selectedChatRoom?: ChatRoomPreview;
}

export interface NavigationStackItem {
  view: ChatNavigationView;
  title: string;
  data?: StudyInquiryRoom | ChatRoomPreview;
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
