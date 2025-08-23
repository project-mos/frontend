import { HTMLAttributes } from "react";
import {
  PrivateChatMessage,
  PrivateChatRoom,
  StudyChatRoom,
} from "@/entities/chat/api/chat.api.types";
import { ChatUser } from "@/entities/chat/lib/mock/chat.mock";

// 통합된 채팅방 타입 정의
export type ChatRoomType =
  | { type: "private"; data: PrivateChatRoom }
  | { type: "study"; data: StudyChatRoom };

// ChatBubble 컴포넌트 props
export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  isMe: boolean;
  profileImage?: string;
  nickname?: string;
  timestamp?: string;
}

// ChatTab 컴포넌트 props
export interface ChatTabProps {
  active: ChatActiveTab;
  onChange: (active: ChatTabProps["active"]) => void;
  unreadChatCount?: number;
  unreadNotificationCount?: number;
}

// ChatItem 컴포넌트 props
export interface ChatItemProps extends HTMLAttributes<HTMLDivElement> {
  privateChatRooms?: PrivateChatRoom[];
  studyChatRooms?: StudyChatRoom[];
  onItemClick: (item: ChatRoomType) => void;
  onDotClick: (item: ChatRoomType) => void;
}

// ChatInput 컴포넌트 props
export interface ChatInputProps {
  onSendMessage?: (message: string) => void;
}

// ChatUserItem 컴포넌트 props
export interface ChatUserItemProps extends HTMLAttributes<HTMLDivElement> {
  user: ChatUser;
  onChatStart: (user: ChatUser) => void;
}

// ChatRoom 컴포넌트 props
export interface ChatRoomProps {
  data: PrivateChatMessage[];
}

// ChatErrorState 컴포넌트 props
export interface ChatErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
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
