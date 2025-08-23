import { ChatItemProps, ChatRoomType } from "@/features/chat/ui/chat.ui.types";
import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";
// import Profile from "@/shared/components/atoms/Profile";
import { formatDate, formatTime } from "@/shared/utils/date";
import React from "react";

// 채팅방 목록 컴포넌트
const ChatItem = ({
  privateChatRooms,
  studyChatRooms,
  onItemClick,
  onDotClick,
}: ChatItemProps) => {
  // 모든 채팅방을 하나의 배열로 통합
  const allChatRooms: ChatRoomType[] = [
    ...(privateChatRooms?.map((room) => ({
      type: "private" as const,
      data: room,
    })) || []),
    ...(studyChatRooms?.map((room) => ({
      type: "study" as const,
      data: room,
    })) || []),
  ];

  // 빈 데이터 처리
  if (allChatRooms.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        채팅방이 없습니다.
      </div>
    );
  }

  // 채팅방 타입별 뱃지 렌더링
  const renderRoomTypeBadge = (type: "private" | "study") => {
    if (type === "private") {
      return (
        <div className="rounded-full bg-blue-100 px-2 py-0.5">
          <Typography.P3 className="text-[10px] font-medium text-blue-600">
            개인
          </Typography.P3>
        </div>
      );
    } else {
      return (
        <div className="rounded-full bg-green-100 px-2 py-0.5">
          <Typography.P3 className="text-[10px] font-medium text-green-600">
            스터디
          </Typography.P3>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {allChatRooms.map((chatRoom, index) => (
        <div
          key={`${chatRoom.type}_${chatRoom.data.chatName}_${index}`}
          className="group flex cursor-pointer items-center justify-between gap-3 rounded-md border p-3 text-black shadow-sm transition hover:bg-gray-100 active:bg-gray-200"
          onClick={() => onItemClick(chatRoom)}
        >
          <div className="flex items-center gap-2">
            {/* 프로필 이미지 */}
            {/* <Profile
              src=""
              width={48}
              height={48}
              className="shrink-0"
            /> */}
            <div className="flex flex-col">
              {/* 채팅방 이름 + 뱃지 + 시간 */}
              <div className="flex items-center gap-2">
                <Typography.P1 className="max-w-[200px] truncate font-bold">
                  {chatRoom.data.chatName}
                </Typography.P1>
                {renderRoomTypeBadge(chatRoom.type)}
                <Typography.P1 className="text-[12px] font-light text-gray-400">
                  {
                    formatDate("YYYY-MM-DD", chatRoom.data.lastMessageAt) ===
                    formatDate("YYYY-MM-DD")
                      ? formatTime(chatRoom.data.lastMessageAt) // 오늘이면 시간만 표시
                      : formatDate(
                          "MM.DD",
                          chatRoom.data.lastMessageAt
                        ) /* 오늘이 아니면 날짜 표시 */
                  }
                </Typography.P1>
              </div>
              {/* 최근 메시지 내용 */}
              <Typography.P1 className="max-w-[200px] truncate whitespace-nowrap text-[12px]">
                {(() => {
                  try {
                    // JSON 형태의 lastMessage를 파싱하여 message 내용만 표시
                    const parsedMessage = JSON.parse(chatRoom.data.lastMessage);
                    return parsedMessage.message || chatRoom.data.lastMessage;
                  } catch {
                    // JSON 파싱 실패 시 원본 메시지 표시
                    return chatRoom.data.lastMessage;
                  }
                })()}
              </Typography.P1>
            </div>
          </div>

          {/* 안 읽은 메시지 개수 + 옵션 버튼 */}
          <div className="flex items-center gap-2">
            {/* 안 읽은 메시지 개수 */}
            {chatRoom.data.unreadCnt > 0 && (
              <div className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5">
                <Typography.P3 className="text-[10px] font-bold leading-none text-white">
                  {chatRoom.data.unreadCnt > 99
                    ? "99+"
                    : chatRoom.data.unreadCnt}
                </Typography.P3>
              </div>
            )}

            {/* 옵션 버튼 (3 dots) 개인 채팅방에만 표시 */}
            {chatRoom.type === "private" && (
              <Button.Icon
                color="Gray"
                className="border-none"
                onClick={(event) => {
                  event.stopPropagation();
                  onDotClick(chatRoom);
                }}
              >
                <i className="bi bi-three-dots" />
              </Button.Icon>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ChatItem;
