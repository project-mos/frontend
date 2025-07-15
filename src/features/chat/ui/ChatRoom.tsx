import { ChatRoomProps } from "@/features/chat/ui/chat.ui.types";
import ChatBubble from "@/features/chat/ui/ChatBubble";
import Badge from "@/shared/components/atoms/Badge";
import { useChatRoom } from "@/features/chat/model/useChatRoom";

import React from "react";

const ChatRoom = ({ data }: ChatRoomProps) => {
  const { showDateBadge, currentDate, scrollContainerRef } = useChatRoom({
    data,
  });

  return (
    <div className="relative h-full">
      {/* 날짜 뱃지 */}

      <div
        className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 opacity-0 data-[show=true]:opacity-100  transition-all duration-1000"
        data-show={showDateBadge}
      >
        <Badge color="Black" className="px-3 py-1 text-[12px]">
          {currentDate}
        </Badge>
      </div>

      {/* 채팅 메시지 리스트 */}
      <div
        ref={scrollContainerRef}
        className="flex h-full flex-col gap-3 px-2 pt-3 overflow-y-auto"
      >
        {data.map((item, index) => {
          // 챗 글자가 19자 이하이면 rounded 스타일로
          const isRoundedStyle = item.content.length < 20;
          return (
            <ChatBubble
              key={`${item.content}_${index}`}
              isMe={item.isMe}
              profileImage={item.profileImage}
              nickname={item.nickname}
              timestamp={item.timestamp}
              className={isRoundedStyle ? "rounded-full" : "rounded-xl"}
            >
              {item.content}
            </ChatBubble>
          );
        })}
      </div>
    </div>
  );
};

export default ChatRoom;
