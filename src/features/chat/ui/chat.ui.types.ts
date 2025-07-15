import { HTMLAttributes } from "react";

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  isMe: boolean;
  profileImage?: string;
  nickname?: string;
  timestamp?: string;
}
export interface ChatTabProps {
  active: ChatActiveTab;
  onChange: (active: ChatTabProps["active"]) => void;
}
// 탭 타입 정의
export type ChatActiveTab = "chat" | "notification";

// 예시 데이터
export interface Chat {
  isMe: boolean;
  content: string;
  profileImage?: string;
  nickname?: string;
  timestamp?: string;
}

export interface ChatRoomProps {
  data: Chat[];
}
