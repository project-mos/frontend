import { tabItems } from "@/entities/chat/lib";
import { ChatTabProps } from "@/features/chat/ui/chat.ui.types";

import React from "react";

const ChatTab = ({ active, onChange }: ChatTabProps) => {
  return (
    <div className="w-full p-3">
      <div className="flex items-center justify-around">
        {tabItems.map(({ key, label }) => (
          <button
            key={key}
            className={`w-24 rounded-full px-3 py-2 ${
              active === key ? "bg-mos-main text-white" : "text-gray-500"
            }`}
            onClick={() => onChange(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatTab;
