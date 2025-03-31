"use client";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import MemberModal from "./MemberModal";
import {
  MockStudyMemberAttendance,
  MockStudyMembers,
} from "@/app/mock/api/study-room";
import { StudyMemberInterface } from "@/types/api/study-room";
import useEnhancedModal from "@/app/hooks/useEnhancedModal";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// import Profile from "@/components/atoms/Profile";
// import profileImg from "../../../../app/asset/images/profile_example.jpeg";

const MemberCard = () => {
  const { isOpen, openModal, closeModal } = useEnhancedModal();
  // 스터디원 조회
  const [membersState] = useState(MockStudyMembers);
  // 스터디원의 출석률 조회
  const [memberAttendanceState] = useState(MockStudyMemberAttendance);
  // 선택한 멤버
  const [selectMemberAttendanceState, setSelectMemberAttendanceState] =
    useState(() => {
      if (memberAttendanceState.length > 0) {
        return memberAttendanceState[0];
      }
    });

  const onMoreHandler = (item: StudyMemberInterface) => {
    // 멤버 출석율 조회에서 맞는 id 찾기
    const find = memberAttendanceState.find(
      (attendanceItem) => attendanceItem.userId === item.userId
    );
    if (find) {
      setSelectMemberAttendanceState(find);
    }
    // modal 띄우기
    openModal();
  };

  const onClose = () => {
    // 선택한 멤버 초기화
    setSelectMemberAttendanceState(undefined);
    // modal 닫기
    closeModal();
  };

  // 📌 날짜를 기반으로 몇 번째 주인지 계산하는 함수
  // const getWeekNumber = (dateString: string): string => {
  //   const date = new Date(dateString);
  //   const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  //   const pastDays = Math.floor(
  //     (date.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24)
  //   );
  //   return `W${Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7)}`;
  // };

  // // 📌 주차별 평균 참여율 계산
  // const getWeeklyAverageParticipation = (members: StudyMemberInterface[]) => {
  //   const weeklyData: Record<string, number[]> = {};

  //   members.forEach((member) => {
  //     const week = getWeekNumber(member.lastAttendanceDate);
  //     if (!weeklyData[week]) {
  //       weeklyData[week] = [];
  //     }
  //     weeklyData[week].push(member.participationRate);
  //   });

  //   return Object.entries(weeklyData).map(([week, rates]) => ({
  //     week,
  //     averageParticipationRate:
  //       rates.reduce((sum, rate) => sum + rate, 0) / rates.length,
  //   }));
  // };

  // const weeklyChartData = getWeeklyAverageParticipation(membersState);
  // console.log(weeklyChartData); // 결과 확인
  return (
    <>
      <MemberModal
        isOpen={isOpen}
        data={selectMemberAttendanceState}
        onClose={onClose}
      />

      <Card className="col-span-6 overflow-x-scroll">
        <Card.Header>
          <Typography.SubTitle1>전체 참여율</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="max-h-[450px] max-w-full flex-row gap-3">
          {/* <ResponsiveContainer width="100%" height={180}>
            <LineChart
              data={weeklyChartData}
              // margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <Line
                type="monotone"
                dataKey="averageParticipationRate"
                stroke="#82ca9d"
                strokeWidth={2}
              />
              <CartesianGrid stroke="#ccc" />
              <XAxis
                dataKey="week"
                interval="preserveStartEnd"
                padding={{ left: 0, right: 0 }}
              />
              <YAxis tickCount={5} domain={[10, 100]} width={30} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer> */}
        </Card.Content>
      </Card>
      <Card className="col-span-2 gap-2 overflow-x-scroll">
        <Card.Header>
          <Typography.SubTitle1>이 달의 우수 멤버</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="max-h-[450px]">
          {/* 임시 데이터 */}
          {membersState.length > 0 && (
            <StudyMemberCard
              data={membersState[0]}
              // onMore={() => onMoreHandler(item)}
            />
          )}
        </Card.Content>
      </Card>
      <Card className="col-span-8 h-fit gap-3 overflow-x-scroll">
        <Card.Header>
          <Typography.SubTitle1>멤버 관리</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="max-h-[450px] max-w-full flex-row gap-3 overflow-x-scroll">
          {membersState.map((item, index) => {
            return (
              <StudyMemberCard
                key={`${item}_${index}`}
                data={item}
                onChat={() => console.log("chat")}
                onMore={() => onMoreHandler(item)}
              />
            );
          })}
        </Card.Content>
      </Card>
    </>
  );
};
const StudyMemberCard = ({
  data,
  onChat,
  onMore,
}: {
  data: StudyMemberInterface;
  onChat?: () => void;
  onMore?: () => void;
}) => {
  return (
    <Card className="min-w-52 gap-2 shadow-none">
      <Card.Header className="flex-col items-center justify-center gap-2">
        {/* <Profile width={80} height={80} src={profileImg} /> */}
        <Typography.Head3>{data.nickname}</Typography.Head3>
        <Badge
          className="w-fit"
          color={data.studyMemberRoleType === "스터디장" ? "Green" : "Blue"}
        >
          <i
            className={cn(
              "bi text-[18px]",
              data.studyMemberRoleType === "스터디장"
                ? "bi-person-gear"
                : "bi-person"
            )}
          />
        </Badge>
        <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
          참여율 {data.participationRate}%
        </Typography.P3>
        <Typography.P3 className="text-[14px] font-medium text-mos-gray-300 tablet:text-[12px]">
          최근 참여일 {data.lastAttendanceDate}
        </Typography.P3>
      </Card.Header>
      <Card.Footer className="justify-center gap-2">
        {onChat && (
          <Button.Icon color="Main" onClick={onChat}>
            <i className="bi bi-chat"></i>
          </Button.Icon>
        )}
        {onMore && (
          <Button.Icon color="Main" onClick={onMore} className="flex">
            <i className="bi bi-three-dots"></i>
          </Button.Icon>
        )}
      </Card.Footer>
    </Card>
  );
};

export default MemberCard;
