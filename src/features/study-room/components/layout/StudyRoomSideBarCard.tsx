"use client";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import React, { useState } from "react";
import StudyRoomTabListWrapper from "./StudyRoomTabListWrapper";
import { useRouter } from "next/navigation";
import URL from "@/constants/URL";

const MENU_ITEMS = [
  {
    name: "일정",
    icon: "bi-calendar",
    path: URL.STUDY_ROOM.DETAIL_SCHEDULE("1"),
  },
  {
    name: "멤버",
    icon: "bi-people",
    path: URL.STUDY_ROOM.DETAIL_MEMBER("1"),
  },
  {
    name: "자료실",
    icon: "bi-folder",
    path: URL.STUDY_ROOM.DETAIL_ARCHIVE("1"),
  },
  {
    name: "커리큘럼",
    icon: "bi-book",
    path: URL.STUDY_ROOM.DETAIL_CURRICULUM("1"),
  },
  {
    name: "채팅",
    icon: "bi-chat",
    path: URL.STUDY_ROOM.DETAIL_CHAT("1"),
  },
  {
    name: "공지사항",
    icon: "bi-megaphone",
    path: URL.STUDY_ROOM.DETAIL_NOTICE("1"),
  },
];

const ADMIN_MENU_ITEMS = [{ name: "지원자 관리", icon: "bi-calendar" }];

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
    <div className="col-span-12 tablet:col-span-2">
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
