import { ChatItemProps } from "@/features/chat/ui/chat.ui.types";
import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";
import { formatDate, formatTime } from "@/shared/utils/date";
import React from "react";

// 채팅방 목록 컴포넌트
const ChatItem = ({
  privateChatRooms,
  studyChatRooms,
  onItemClick,
  onDotClick,
}: ChatItemProps) => {
  // 빈 데이터 처리
  if (
    (!privateChatRooms || privateChatRooms.length === 0) &&
    (!studyChatRooms || studyChatRooms.length === 0)
  ) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        채팅방이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 개인 채팅방 목록 */}
      {privateChatRooms?.map((room, index) => (
        <div
          key={`private_${room.privateChatRoomId}_${index}`}
          className="group flex cursor-pointer items-center justify-between gap-3 rounded-md border p-3 text-black shadow-sm transition hover:bg-gray-100 active:bg-gray-200"
          onClick={() => onItemClick({ type: "private", data: room })}
        >
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              {/* 채팅방 이름 + 시간 */}
              <div className="flex items-center gap-2">
                <Typography.P1 className="max-w-[200px] truncate font-bold">
                  {room.chatName}
                </Typography.P1>
                <Typography.P1 className="text-[12px] font-light text-gray-400">
                  {formatDate("YYYY-MM-DD", room.lastMessageAt) ===
                  formatDate("YYYY-MM-DD")
                    ? formatTime(room.lastMessageAt)
                    : formatDate("MM.DD", room.lastMessageAt)}
                </Typography.P1>
              </div>
              {/* 최근 메시지 내용 */}
              <Typography.P1 className="max-w-[200px] truncate whitespace-nowrap text-[12px]">
                {(() => {
                  try {
                    const parsedMessage = JSON.parse(room.lastMessage);
                    return parsedMessage.message || room.lastMessage;
                  } catch {
                    return room.lastMessage;
                  }
                })()}
              </Typography.P1>
            </div>
          </div>

          {/* 안 읽은 메시지 개수 + 옵션 버튼 */}
          <div className="flex items-center gap-2">
            {room.unreadCnt > 0 && (
              <div className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5">
                <Typography.P3 className="text-[10px] font-bold leading-none text-white">
                  {room.unreadCnt > 99 ? "99+" : room.unreadCnt}
                </Typography.P3>
              </div>
            )}

            <Button.Icon
              color="Gray"
              className="border-none"
              onClick={(event) => {
                event.stopPropagation();
                onDotClick({ type: "private", data: room });
              }}
            >
              <i className="bi bi-three-dots" />
            </Button.Icon>
          </div>
        </div>
      ))}

      {/* 스터디 채팅방 목록 */}
      {studyChatRooms?.map((room, index) => (
        <div
          key={`study_${room.studyChatRoomId}_${index}`}
          className="group flex cursor-pointer items-center justify-between gap-3 rounded-md border p-3 text-black shadow-sm transition hover:bg-gray-100 active:bg-gray-200"
          onClick={() => onItemClick({ type: "study", data: room })}
        >
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              {/* 채팅방 이름 + 시간 */}
              <div className="flex items-center gap-2">
                <Typography.P1 className="max-w-[200px] truncate font-bold">
                  {room.chatName}
                </Typography.P1>
                <Typography.P1 className="text-[12px] font-light text-gray-400">
                  {formatDate("YYYY-MM-DD", room.lastMessageAt) ===
                  formatDate("YYYY-MM-DD")
                    ? formatTime(room.lastMessageAt)
                    : formatDate("MM.DD", room.lastMessageAt)}
                </Typography.P1>
              </div>
              {/* 최근 메시지 내용 */}
              <Typography.P1 className="max-w-[200px] truncate whitespace-nowrap text-[12px]">
                {(() => {
                  try {
                    const parsedMessage = JSON.parse(room.lastMessage);
                    return parsedMessage.message || room.lastMessage;
                  } catch {
                    return room.lastMessage;
                  }
                })()}
              </Typography.P1>
            </div>
          </div>

          {/* 안 읽은 메시지 개수 */}
          <div className="flex items-center gap-2">
            {room.unreadCnt > 0 && (
              <div className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5">
                <Typography.P3 className="text-[10px] font-bold leading-none text-white">
                  {room.unreadCnt > 99 ? "99+" : room.unreadCnt}
                </Typography.P3>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatItem;
