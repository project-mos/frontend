import { ChatBubbleProps } from "@/features/chat/ui/chat.ui.types";
import Typography from "@/shared/components/atoms/Typography";
import Profile from "@/shared/components/atoms/Profile";
import defaultProfile from "@/asset/images/defaultProfile.png";
import clsx from "clsx";
import React from "react";

const ChatBubble = ({
  isMe,
  profileImage,
  nickname,
  children,
  className,
  ...props
}: ChatBubbleProps) => {
  // 내 메시지일 때
  if (isMe) {
    return (
      <div className="flex justify-end">
        <div
          className={clsx(
            "max-w-[70%] rounded-full px-3 py-2 bg-mos-main text-white",
            className
          )}
          {...props}
        >
          <Typography.P3 className="text-[14px]">{children}</Typography.P3>
        </div>
      </div>
    );
  }

  // 상대방 메시지일 때
  return (
    <div className="flex items-start gap-2">
      <Profile
        src={profileImage || defaultProfile}
        width={32}
        height={32}
        className="flex-shrink-0"
      />
      <div className="flex flex-col gap-1">
        <Typography.P3 className="text-[12px] text-black font-medium">
          {nickname || "익명"}
        </Typography.P3>
        <div
          className={clsx(
            "max-w-[280px] rounded-full px-3 py-2 bg-slate-300 text-black",
            className
          )}
          {...props}
        >
          <Typography.P3 className="text-[14px]">{children}</Typography.P3>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
