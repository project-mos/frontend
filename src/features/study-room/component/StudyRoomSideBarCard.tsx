"use client";
import { useParams, usePathname, useRouter } from "next/navigation";

import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import {
  ADMIN_MENU_ITEMS,
  MENU_ITEMS,
  MenuItem,
} from "@/shared/constants/SidebarItems";
import StudyRoomTabListWrapper from "./StudyRoomTabListWrapper";

const StudyRoomSideBarCard = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useParams();
  const id = params.id as string;

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  // 메뉴
  const renderTab = (item: MenuItem) => {
    const isActive = pathname === item.path;
    return (
      <StudyRoomTabListWrapper
        key={item.name}
        active={isActive}
        onClick={() => handleTabClick(item.path)}
      >
        <i className={`bi ${item.icon}`} />
        <Typography.P3>{item.name}</Typography.P3>
      </StudyRoomTabListWrapper>
    );
  };

  return (
    <div className="hidden tablet:col-span-3 tablet:block laptop:col-span-2">
      {/* 기본 메뉴 */}
      <Card className="mb-3 gap-3">
        <Card.Header>
          <Typography.SubTitle1>메뉴</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="gap-1">
          {MENU_ITEMS(id).map(renderTab)}
        </Card.Content>
      </Card>

      {/* 관리자 메뉴 */}
      <Card className="gap-3">
        <Card.Header>
          <Typography.SubTitle1>관리자 메뉴</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="gap-1">
          {ADMIN_MENU_ITEMS(id).map(renderTab)}
        </Card.Content>
      </Card>
    </div>
  );
};

export default StudyRoomSideBarCard;
