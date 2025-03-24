"use client";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import React, { useState } from "react";
import StudyRoomTabListWrapper from "./StudyRoomTabListWrapper";
import { useRouter } from "next/navigation";
import { ADMIN_MENU_ITEMS, MENU_ITEMS } from "@/constants/SidebarItems";

const StudyRoomSideBarCard = () => {
  const [activeTab, setActiveTab] = useState<string>("일정");
  const router = useRouter();

  const handleTabClick = (tabName: string, path?: string) => {
    setActiveTab(tabName);
    if (path) router.push(path);
  };

  // 메뉴
  const renderTab = (item: { name: string; icon: string; path?: string }) => (
    <StudyRoomTabListWrapper
      key={item.name}
      active={activeTab === item.name}
      onClick={() => handleTabClick(item.name, item.path)}
    >
      <i className={`bi ${item.icon}`} />
      <Typography.P3>{item.name}</Typography.P3>
    </StudyRoomTabListWrapper>
  );

  return (
    <div className="hidden tablet:col-span-3 tablet:block laptop:col-span-2">
      {/* 기본 메뉴 */}
      <Card className="mb-3 gap-3">
        <Card.Header>
          <Typography.SubTitle1>메뉴</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="gap-1">
          {MENU_ITEMS.map(renderTab)}
        </Card.Content>
      </Card>

      {/* 관리자 메뉴 */}
      <Card className="gap-3">
        <Card.Header>
          <Typography.SubTitle1>관리자 메뉴</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="gap-1">
          {ADMIN_MENU_ITEMS.map(renderTab)}
        </Card.Content>
      </Card>
    </div>
  );
};

export default StudyRoomSideBarCard;
