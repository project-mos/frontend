"use client";
import useModal from "@/app/hooks/useModal";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import React from "react";
import MemberModal from "./MemberModal";
import { MockStudyMembers } from "@/app/mock/api/study-room";

const thStyle = "px-1 py-2 text-[14px] tablet:text-sm";

const MemberCard = () => {
  const { modal, openModal, closeModal } = useModal();
  return (
    <>
      <MemberModal
        isOpen={modal}
        onClose={closeModal}
        memberName="홍길동"
        email="hong@example.com"
        experience="프론트엔드 2년차"
        attendanceRate={90}
        attendanceRecords={[
          { date: "2024-03-25", status: "출석" },
          { date: "2024-03-24", status: "지각" },
          { date: "2024-03-23", status: "결석" },
        ]}
      />

      <Card className="h-fit gap-3 overflow-x-scroll">
        <Card.Header>
          <Typography.SubTitle1>멤버 관리</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="max-h-[450px] gap-3 overflow-y-scroll ">
          <table className="text-surface min-w-full text-left text-sm font-light">
            <thead className="border-b border-neutral-200 font-medium ">
              <tr>
                <th scope="col" className={cn(thStyle)}>
                  역할
                </th>
                <th scope="col" className={cn(thStyle)}>
                  이름
                </th>
                <th scope="col" className={cn(thStyle)}>
                  참여일
                </th>
                <th scope="col" className={cn(thStyle)}>
                  참여율
                </th>
                <th scope="col" className={cn(thStyle)}>
                  동작
                </th>
              </tr>
            </thead>
            <tbody>
              {MockStudyMembers.map((item, index) => {
                return (
                  <StudyMemberRow
                    key={`${item}_${index}`}
                    role={item.role}
                    name={item.name}
                    date={item.date}
                    progress={item.progress}
                    onChat={() => console.log("Chat clicked")}
                    onMore={openModal}
                  />
                );
              })}
            </tbody>
          </table>
        </Card.Content>
      </Card>
    </>
  );
};

const StudyMemberRow = ({
  role,
  name,
  date,
  progress,
  onChat,
  onMore,
}: {
  role: "스터디장" | "스터디원";
  name: string;
  date: string;
  progress: number;
  onChat: () => void;
  onMore: () => void;
}) => {
  return (
    <tr className="border-b border-neutral-200">
      <td className="w-fit p-2">
        <Badge className="w-fit" color={role === "스터디장" ? "Green" : "Blue"}>
          <i
            className={cn(
              "bi text-[18px]",
              role === "스터디장" ? "bi-person-gear" : "bi-person"
            )}
          />
        </Badge>
      </td>
      <td className="p-2 font-medium">
        <Typography.P3 className="text-[14px] tablet:text-sm">
          {name}
        </Typography.P3>
      </td>
      <td className="p-2">
        <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
          {date}
        </Typography.P3>
      </td>
      <td className="p-2">
        <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
          {progress}%
        </Typography.P3>
      </td>
      <td className="flex gap-2 p-2 ">
        <Button.Icon color="Main" onClick={onChat}>
          <i className="bi bi-chat"></i>
        </Button.Icon>
        <Button.Icon color="Main" onClick={onMore} className="flex">
          <i className="bi bi-journal-check"></i>
        </Button.Icon>
      </td>
    </tr>
  );
};

export default MemberCard;
