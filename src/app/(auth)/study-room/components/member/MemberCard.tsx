"use client";

import cn from "@/shared/utils/cn";
import { useEffect, useState } from "react";

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

import { getAttendances } from "@/features/study-room/services/study-room.service";
import { GetAttendancesResponse } from "@/features/study-room/types/study-room.api";
import {
  MemberCardProps,
  StudyMemberCardProps,
} from "@/features/study-room/types/study-room.type";
import Badge from "@/shared/components/atoms/Badge";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import useModal from "@/shared/hooks/useModal";
import { StudyMemberInterface } from "@/shared/types/api/study-room";
import MemberModal from "./MemberModal";

const MemberCard = ({ members, studyId }: MemberCardProps) => {
  const { isModalOpenState, openModal, closeModal } = useModal();

  const [membersState] = useState(members);
  const [memberAttendanceState, setMemberAttendanceState] = useState<
    GetAttendancesResponse[]
  >([]);
  // 선택한 멤버
  const [selectMemberAttendanceState, setSelectMemberAttendanceState] =
    useState(() => {
      if (memberAttendanceState.length > 0) {
        return memberAttendanceState[0];
      }
    });
  // 우수 멤버
  const [bestMember, setBestMember] = useState<StudyMemberInterface>();

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

  function findBestMember(members: StudyMemberInterface[]) {
    if (!Array.isArray(members) || members.length === 0) return null;

    return members.reduce((max, item) => {
      if (!("participationRate" in item)) return max;
      return item["participationRate"] > max["participationRate"] ? item : max;
    });
  }

  async function getAttendancesFunction() {
    const res = await getAttendances({ studyId: studyId });

    setMemberAttendanceState(res);
  }

  useEffect(() => {
    getAttendancesFunction();
    const best = findBestMember(members);
    if (best) setBestMember(best);
  }, []);

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
        isOpen={isModalOpenState}
        data={selectMemberAttendanceState}
        onClose={onClose}
      />

      <Card className="col-span-8 overflow-x-scroll">
        <Card.Header>
          <Typography.SubTitle1>전체 참여율</Typography.SubTitle1>
        </Card.Header>

        <Card.Content className="max-h-[450px]">
          <div className="h-32">Chart</div>
        </Card.Content>
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
      {/* <Card className="col-span-2 gap-2 overflow-x-scroll">
        <Card.Header>
          <Typography.SubTitle1>이 달의 우수 멤버</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="max-h-[450px]">
          {bestMember && <StudyMemberCard data={bestMember} />}
        </Card.Content>
      </Card> */}

      <Card className="col-span-8 h-fit gap-3 overflow-x-scroll">
        <Card.Header>
          <Typography.SubTitle1>멤버 관리</Typography.SubTitle1>
        </Card.Header>
        <Card.Content className="max-h-[450px] max-w-full flex-row gap-3 overflow-x-scroll">
          {membersState.map((item, index) => {
            const isBest = item.userId === bestMember?.userId;

            return (
              <StudyMemberCard
                key={`${item}_${index}`}
                data={item}
                isBest={isBest}
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
  isBest,
  onChat,
  onMore,
}: StudyMemberCardProps) => {
  return (
    <Card className="relative min-w-52 gap-2 shadow-none">
      {isBest && (
        <i className="bi bi-bookmark-star-fill absolute left-0 top-0 text-2xl text-mos-main" />
      )}
      <Card.Header className="flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-1">
          <Typography.Head3>{data.nickname}</Typography.Head3>
        </div>
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
        <div className="flex items-center gap-1">
          {/* {isBest && (
            <i className="bi bi-star-fill text-yellow-300 ml-[-10px]" />
          )} */}
          <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
            참여율 {data.participationRate}%
          </Typography.P3>
        </div>
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
