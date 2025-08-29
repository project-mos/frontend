export type MessageType = "text" | "image" | "file";
export type ChatRoomType = "personal" | "group" | "inquiry" | "study-inquiry";

// 채팅 유저 타입
export interface ChatUser {
  id: string;
  name: string;
  avatarUrl: string;
  role?: "admin" | "member" | "guest"; // 역할
}


