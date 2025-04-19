import clsx from "clsx";
import React, { HTMLAttributes } from "react";

const ChatRoom = () => {
  return (
    <div className="flex h-full flex-col gap-2 px-2 pt-3">
      <ChatBubble isMe={false}>안녕하세요! 무엇을 도와드릴까요?</ChatBubble>
      <ChatBubble isMe>asd</ChatBubble>
      <ChatBubble isMe={false}>asd</ChatBubble>
    </div>
  );
};

interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  isMe: boolean;
}
const ChatBubble = ({ isMe, children, ...props }: ChatBubbleProps) => {
  return (
    <div
      className={clsx(
        "max-w-[70%] rounded-full px-3 py-2",
        isMe
          ? "self-end bg-mos-main text-white"
          : "self-start bg-slate-300 text-black"
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ChatRoom;
