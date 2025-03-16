"use client";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface TabProps {
  tabList: string[];
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}

const Tab = ({ tabList, selectedTab, setSelectedTab }: TabProps) => {
  return (
    <div className="flex w-full gap-[10px] border-b border-mos-gray-100">
      {tabList.map((list) => (
        <button
          key={list}
          onClick={() => setSelectedTab(list)}
          className={cn(
            "relative p-[10px] pb-2 transition-colors duration-200",
            selectedTab === list
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
