"use client";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

interface TabProps {
  tabList: string[];
}

const Tab = ({ tabList }: TabProps) => {
  const [activeButton, setActiveButton] = useState<string>(tabList[0] || "");

  const handleTabClick = useCallback((tab: string) => {
    setActiveButton(tab);
  }, []);

  return (
    <div className="flex w-full gap-[40px] border-b border-mos-gray-500">
      {tabList.map((list) => (
        <button
          key={list}
          onClick={() => handleTabClick(list)}
          className={cn(
            "relative pb-2 transition-colors duration-200",
            activeButton === list
              ? "text-mos-main after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-full after:bg-mos-main after:content-['']"
              : "text-mos-gray-500 hover:text-mos-main"
          )}
        >
          {list}
        </button>
      ))}
    </div>
  );
};

export default Tab;
