import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import React from "react";
import DashboardTabListWrapper from "./atom/DashboardTabListWrapper";

const DashboardSideBarCard = () => {
  return (
    <div className="col-span-12 tablet:col-span-2">
      <Card className="mb-3 gap-3">
        <Card.Header>
          <Typography.SubTitle1>메뉴</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="gap-1">
          <DashboardTabListWrapper active>
            <i className="bi bi-calendar " />
            <Typography.P3>일정</Typography.P3>
          </DashboardTabListWrapper>
          <DashboardTabListWrapper>
            <i className="bi bi-people " />
            <Typography.P3>멤버</Typography.P3>
          </DashboardTabListWrapper>
          <DashboardTabListWrapper>
            <i className="bi bi-folder " />
            <Typography.P3>자료실</Typography.P3>
          </DashboardTabListWrapper>
          <DashboardTabListWrapper>
            <i className="bi bi-book " />
            <Typography.P3>커리큘럼</Typography.P3>
          </DashboardTabListWrapper>
          <DashboardTabListWrapper>
            <i className="bi bi-chat " />
            <Typography.P3>채팅</Typography.P3>
          </DashboardTabListWrapper>
          <DashboardTabListWrapper>
            <i className="bi bi-megaphone" />
            <Typography.P3>공지사항</Typography.P3>
          </DashboardTabListWrapper>
        </Card.Content>
      </Card>
      {/* 관리자 */}
      <Card className="gap-3">
        <Card.Header>
          <Typography.SubTitle1>관리자 메뉴</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="gap-1">
          <DashboardTabListWrapper>
            <i className="bi bi-calendar " />
            <Typography.P3>지원자 관리</Typography.P3>
          </DashboardTabListWrapper>
        </Card.Content>
      </Card>
    </div>
  );
};

export default DashboardSideBarCard;
