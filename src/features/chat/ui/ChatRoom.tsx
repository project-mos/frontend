import { ChatRoomProps } from "@/features/chat/ui/chat.ui.types";
import ChatBubble from "@/features/chat/ui/ChatBubble";

import React from "react";

const ChatRoom = ({ data }: ChatRoomProps) => {
  return (
    <div className="flex h-full flex-col gap-2 px-2 pt-3">
      {data.map((item, index) => {
        // 챗 글자가 19자 이하이면 rounded 스타일로
        const isRoundedStyle = item.content.length < 20;
        return (
          <ChatBubble
            key={`${item.content}_${index}`}
            isMe={item.isMe}
            className={isRoundedStyle ? "rounded-full" : "rounded-xl"}
          >
            {item.content}
          </ChatBubble>
        );
      })}
    </div>
  );
};

export default ChatRoom;
