import { ActiveTab } from "@/features/landing/components/chat/Chat";
import React from "react";

export interface TabProps {
  active: ActiveTab;
  onChange: (active: TabProps["active"]) => void;
}

const tabItems: { key: TabProps["active"]; label: string }[] = [
  { key: "chat", label: "채팅방" },
  { key: "notices", label: "알림" },
];

const ChatTab = ({ active, onChange }: TabProps) => {
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
