import { ChatRoomPreview } from "@/entities/chat/lib/mock/chat.mock";
import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";
import { formatDate } from "@/shared/utils/date";
import React, { HTMLAttributes, MouseEvent } from "react";

interface ChatItemProps extends HTMLAttributes<HTMLDivElement> {
  item: ChatRoomPreview;
  onDotClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

// 채팅방 미리보기 아이템
const ChatItem = ({ item, onDotClick, ...props }: ChatItemProps) => {
  return (
    <div
      className="group flex cursor-pointer items-center justify-between gap-3 rounded-md p-2 text-black transition hover:bg-gray-100 active:bg-gray-200"
      {...props}
      onClick={(event) => {
        event.preventDefault();
        if (props.onClick) {
          props.onClick(event);
        }
      }}
    >
      <div className="flex items-center gap-2">
        {/* 프로필 이미지 */}
        <div className="size-12 rounded-full bg-red-200" />
        <div className="flex flex-col">
          {/* 사용자 이름 + 시간 */}
          <div className="flex items-center gap-2">
            <Typography.P1 className="font-bold">
              {item.user.name}
            </Typography.P1>
            <Typography.P1 className="text-[12px] font-light text-gray-400">
              {formatDate("MM:DD", item.lastMessage.timestamp)}
            </Typography.P1>
          </div>
          {/* 최근 메시지 내용 */}
          <Typography.P1 className="text-[12px]">
            {item.lastMessage.content}
          </Typography.P1>
        </div>
      </div>

      {/* 옵션 버튼 (3 dots) */}
      <div className="mr-2">
        <Button.Icon
          color="Gray"
          className="border-none"
          onClick={(event) => {
            event.stopPropagation();
            onDotClick(event);
          }}
        >
          <i className="bi bi-three-dots" />
        </Button.Icon>
      </div>
    </div>
  );
};
export default ChatItem;
