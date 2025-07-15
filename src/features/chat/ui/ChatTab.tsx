import { tabItems } from "@/entities/chat/lib";
import { ChatTabProps } from "@/features/chat/ui/chat.ui.types";

import React from "react";

const ChatTab = ({
  active,
  onChange,
  unreadChatCount = 0,
  unreadNotificationCount = 0,
}: ChatTabProps) => {
  // 탭별 미읽은 개수 매핑
  const getUnreadCount = (tabKey: string) => {
    switch (tabKey) {
      case "chat":
        return unreadChatCount;
      case "notification":
        return unreadNotificationCount;
      default:
        return 0;
    }
  };

  return (
    <div className="w-full p-3">
      <div className="flex items-center justify-around">
        {tabItems.map(({ key, label }) => {
          const unreadCount = getUnreadCount(key);
          return (
            <button
              key={key}
              className={`relative w-24 rounded-full px-3 py-2 ${
                active === key ? "bg-mos-main text-white" : "text-gray-500"
              }`}
              onClick={() => onChange(key)}
            >
              {label}
              {/* 미읽은 메시지/알림 표시 dot */}
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 size-2 rounded-full bg-red-500 border border-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChatTab;
