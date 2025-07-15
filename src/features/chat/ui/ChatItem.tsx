import { ChatRoomPreview } from "@/entities/chat/lib/mock/chat.mock";
import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";
import Badge from "@/shared/components/atoms/Badge";
import Profile from "@/shared/components/atoms/Profile";
import { formatDate } from "@/shared/utils/date";
import React, { HTMLAttributes, MouseEvent } from "react";

interface ChatItemProps extends HTMLAttributes<HTMLDivElement> {
  item: ChatRoomPreview;
  onDotClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

// 채팅방 미리보기 아이템
const ChatItem = ({ item, onDotClick, ...props }: ChatItemProps) => {
  // 채팅방 타입에 따른 뱃지 렌더링
  const renderRoomTypeBadge = () => {
    switch (item.roomType) {
      case "group":
        return (
          <Badge color="Blue" className="text-[10px] px-1.5">
            <i className="bi bi-people text-[10px]" />
          </Badge>
        );
      case "inquiry":
        return (
          <Badge color="Pink" className="text-[10px] px-1.5">
            <i className="bi bi-headset text-[10px]" />
          </Badge>
        );
      case "personal":
      default:
        return null; // 개인채팅방은 뱃지 표시 안함
    }
  };

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
        <Profile
          src={item.user.avatarUrl}
          width={48}
          height={48}
          className="flex-shrink-0"
        />
        <div className="flex flex-col">
          {/* 사용자 이름 + 뱃지 + 시간 */}
          <div className="flex items-center gap-2">
            <Typography.P1 className="font-bold max-w-[120px] truncate">
              {item.user.name}
            </Typography.P1>
            {renderRoomTypeBadge()}
            <Typography.P1 className="text-[12px] font-light text-gray-400">
              {formatDate("MM:DD", item.lastMessage.timestamp)}
            </Typography.P1>
          </div>
          {/* 최근 메시지 내용 */}
          <Typography.P1 className="text-[12px] max-w-[200px] truncate whitespace-nowrap">
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
