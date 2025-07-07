import { ChatUser } from "@/entities/chat/lib/mock/chat.mock";
import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";
import React, { HTMLAttributes } from "react";

interface ChatUserItemProps extends HTMLAttributes<HTMLDivElement> {
  user: ChatUser;
  onChatStart: (user: ChatUser) => void; // 채팅 시작 버튼 클릭 핸들러
}

// 채팅 유저 아이템
const ChatUserItem = ({ user, onChatStart, ...props }: ChatUserItemProps) => {
  // 역할에 따른 배지 색상 설정
  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "member":
        return "bg-blue-100 text-blue-800";
      case "guest":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className="group flex cursor-pointer items-center justify-between gap-3 rounded-md p-2 text-black transition hover:bg-gray-100 active:bg-gray-200"
      {...props}
    >
      <div className="flex items-center gap-2">
        {/* 프로필 이미지 */}
        <div className="size-12 rounded-full bg-red-200" />

        <div className="flex flex-col">
          {/* 사용자 이름 + 역할 */}
          <div className="flex items-center gap-2">
            <Typography.P1 className="font-bold">{user.name}</Typography.P1>
            {user.role && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                {user.role === "admin"
                  ? "운영자"
                  : user.role === "member"
                  ? "멤버"
                  : "게스트"}
              </span>
            )}
          </div>

          {/* 유저 ID */}
          <Typography.P1 className="text-[12px] text-gray-400">
            @{user.id}
          </Typography.P1>
        </div>
      </div>

      {/* 채팅 시작 버튼 */}
      <div className="mr-2">
        <Button.Icon
          color="Gray"
          className="border-none"
          onClick={(event) => {
            event.stopPropagation();
            onChatStart(user);
          }}
        >
          <i className="bi bi-chat-dots" />
        </Button.Icon>
      </div>
    </div>
  );
};

export default ChatUserItem;
