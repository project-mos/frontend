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

import {
  StudyMemberAttendanceInterface,
  StudyMemberInterface,
} from "@/features/study-room/types/study-room.type";
import Badge from "@/shared/components/atoms/Badge";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import useDecodeToken from "@/shared/hooks/useDecodeToken";
import useModal from "@/shared/hooks/useModal";
import { getAttendances } from "../../attendance/api/attendance.api";
import { useMyStudyRole } from "../model/member.query";
import MemberModal from "./MemberModal";

interface MemberCardProps {
  members: StudyMemberInterface[];
  studyId: string;
}

interface StudyMemberCardProps {
  data: StudyMemberInterface;
  isBest: boolean;
  onChat?: () => void;
  onMore?: () => void;
}

const MemberCard = ({ members, studyId }: MemberCardProps) => {
  const { isModalOpenState, openModal, closeModal } = useModal();
  const currentUser = useDecodeToken();
  const myRole = useMyStudyRole(studyId);

  const [memberAttendanceState, setMemberAttendanceState] = useState<
    StudyMemberAttendanceInterface[]
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
    const res = await getAttendances({ studyId: Number(studyId) });

    setMemberAttendanceState(res);
  }

  useEffect(() => {
    getAttendancesFunction();
    const best = findBestMember(members);
    if (best) setBestMember(best);
  }, []);

  return (
    <>
      <MemberModal
        isOpen={isModalOpenState}
        studyId={studyId}
        data={selectMemberAttendanceState}
        onClose={onClose}
        isOwner={myRole === "스터디장"}
        isMyInfo={currentUser?.id === selectMemberAttendanceState?.userId}
      />

      <Card className="col-span-8 gap-3 w-full">
        <Card.Header className="flex flex-col">
          <Typography.SubTitle1>멤버 관리</Typography.SubTitle1>
        </Card.Header>
        <Card.Content
          className="
          max-h-[620px]
          overflow-auto
              grid 
              grid-cols-2 
              laptop:grid-cols-3
              gap-5
              p-2
            "
        >
          {members.map((item, index) => {
            const isBest = item.userId === bestMember?.userId;

            return (
              <StudyMemberCard
                key={`${item.userId}-${index}`}
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
