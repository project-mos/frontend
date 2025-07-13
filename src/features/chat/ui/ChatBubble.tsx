import { ChatBubbleProps } from "@/features/chat/ui/chat.ui.types";
import Typography from "@/shared/components/atoms/Typography";
import clsx from "clsx";
import React from "react";

const ChatBubble = ({
  isMe,
  children,
  className,
  ...props
}: ChatBubbleProps) => {
  return (
    <div
      className={clsx(
        "max-w-[70%] rounded-full px-3 py-2",
        isMe
          ? "self-end bg-mos-main text-white"
          : "self-start bg-slate-300 text-black",
        className
      )}
      {...props}
    >
      <Typography.P3 className="text-[14px]">{children}</Typography.P3>
    </div>
  );
};

export default ChatBubble;
