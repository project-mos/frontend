"use client";
import { useChatUIStore } from "@/shared/store/useChatUIStore";
import { ChatRoomPreview } from "@/entities/chat/lib/mock/chat.mock";
import Button from "@/shared/components/atoms/Button";
import { Tooltip } from "@heroui/tooltip";

interface MessageToLeaderButtonProps {
  chatRoomPreview: ChatRoomPreview;
}

const MessageToLeaderButton = ({
  chatRoomPreview,
}: MessageToLeaderButtonProps) => {
  const openChat = useChatUIStore((s) => s.openChat);
  return (
    <Tooltip
      content="문의하기"
      className="rounded-md bg-mos-main-500 px-3 py-1.5 text-[14px] text-white shadow-md"
      placement="bottom"
    >
      <Button.Icon
        color="Main"
        className="flex-2 w-full"
        onClick={() => openChat(chatRoomPreview)}
      >
        <i className="bi bi-chat-dots text-[14px]" />
      </Button.Icon>
    </Tooltip>
  );
};

export default MessageToLeaderButton;
