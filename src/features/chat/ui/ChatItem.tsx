import { PrivateChatRoom } from "@/entities/chat/api/chat.api.types";
import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";
import Profile from "@/shared/components/atoms/Profile";
import { formatDate } from "@/shared/utils/date";
import React, { HTMLAttributes, MouseEvent } from "react";

interface ChatItemProps extends HTMLAttributes<HTMLDivElement> {
  privateChatRooms?: PrivateChatRoom[];
  onItemClick: (item: PrivateChatRoom) => void;
  onDotClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

// 채팅방 목록 컴포넌트
const ChatItem = ({ privateChatRooms, onItemClick, onDotClick }: ChatItemProps) => {
  // 빈 데이터 처리
  if (!privateChatRooms || privateChatRooms.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        채팅방이 없습니다.
      </div>
    );
  }

  // 개인 채팅방은 뱃지 표시 안함
  const renderRoomTypeBadge = () => {
    return null;
  };

  return (
    <div className="flex flex-col gap-3">
      {privateChatRooms.map((item, index) => (
        <div
          key={`${item.privateChatRoomId}_${index}`}
          className="group flex cursor-pointer items-center justify-between gap-3 rounded-md p-2 text-black transition hover:bg-gray-100 active:bg-gray-200"
          onClick={() => onItemClick(item)}
        >
          <div className="flex items-center gap-2">
            {/* 프로필 이미지 */}
            <Profile
              src=""
              width={48}
              height={48}
              className="shrink-0"
            />
            <div className="flex flex-col">
              {/* 채팅방 이름 + 뱃지 + 시간 */}
              <div className="flex items-center gap-2">
                <Typography.P1 className="max-w-[120px] truncate font-bold">
                  {item.chatName}
                </Typography.P1>
                {renderRoomTypeBadge()}
                <Typography.P1 className="text-[12px] font-light text-gray-400">
                  {formatDate("MM:DD", item.createdAt)}
                </Typography.P1>
              </div>
              {/* 최근 메시지 내용 */}
              <Typography.P1 className="max-w-[200px] truncate whitespace-nowrap text-[12px]">
                {item.lastMessage}
              </Typography.P1>
            </div>
          </div>

          {/* 안 읽은 메시지 개수 + 옵션 버튼 */}
          <div className="flex items-center gap-2">
            {/* 안 읽은 메시지 개수 */}
            {item.unreadCnt > 0 && (
              <div className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5">
                <Typography.P3 className="text-[10px] font-bold leading-none text-white">
                  {item.unreadCnt > 99 ? "99+" : item.unreadCnt}
                </Typography.P3>
              </div>
            )}

            {/* 옵션 버튼 (3 dots) */}
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
      ))}
    </div>
  );
};
export default ChatItem;
