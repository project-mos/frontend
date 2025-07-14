import { ChatTabProps } from "@/features/chat/ui/chat.ui.types";

export const tabItems: { key: ChatTabProps["active"]; label: string }[] = [
  { key: "chat", label: "채팅방" },
  { key: "notification", label: "알림" },
];
