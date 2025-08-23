import React from "react";
import { ChatTypeSwitchProps } from "./chat.ui.types";

const ChatTypeSwitch: React.FC<ChatTypeSwitchProps> = ({
  chatType,
  onChatTypeChange,
}) => {
  const buttonConfig = [
    {
      type: "private" as const,
      icon: "bi-person",
      color: "blue",
    },
    {
      type: "study" as const,
      icon: "bi-people",
      color: "green",
    },
  ];

  return (
    <div className="relative flex items-center gap-0.5 rounded-full bg-gray-50 shadow-sm">
      {/* 슬라이딩 배경 */}
      <div
        className={`absolute top-[5px] h-5 w-8 rounded-full bg-white shadow-sm ring-1 transition-all duration-300 ease-out ${
          chatType === "private"
            ? "left-.5 ring-blue-100"
            : "left-[calc(100%-2rem)] ring-green-100"
        }`}
      />

      {buttonConfig.map(({ type, icon, color }) => (
        <button
          key={type}
          className={`relative z-10 flex w-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-200 ${
            chatType === type
              ? `text-${color}-600`
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onChatTypeChange(type)}
        >
          <i className={`${icon} text-[16px]`} />
        </button>
      ))}
    </div>
  );
};

export default ChatTypeSwitch;
