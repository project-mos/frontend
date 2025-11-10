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
  members = [
    {
      userId: 1,
      nickname: "강민재",
      studyMemberRoleType: "스터디장",
      lastAttendanceDate: "2025-01-20",
      participationRate: 98,
    },
    {
      userId: 2,
      nickname: "김철수",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-19",
      participationRate: 85,
    },
    {
      userId: 3,
      nickname: "이영희",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-18",
      participationRate: 92,
    },
    {
      userId: 4,
      nickname: "박민수",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-15",
      participationRate: 74,
    },
    {
      userId: 5,
      nickname: "정우성",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-21",
      participationRate: 88,
    },
    {
      userId: 6,
      nickname: "손흥민",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-17",
      participationRate: 91,
    },
    {
      userId: 7,
      nickname: "박지성",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-14",
      participationRate: 67,
    },
    {
      userId: 8,
      nickname: "김연아",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-20",
      participationRate: 95,
    },
    {
      userId: 9,
      nickname: "유재석",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-13",
      participationRate: 80,
    },
    {
      userId: 10,
      nickname: "강호동",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-10",
      participationRate: 72,
    },
    {
      userId: 11,
      nickname: "아이유",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-21",
      participationRate: 97,
    },
    {
      userId: 12,
      nickname: "제이홉",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-12",
      participationRate: 65,
    },
    {
      userId: 13,
      nickname: "RM",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-19",
      participationRate: 90,
    },
    {
      userId: 14,
      nickname: "진",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-16",
      participationRate: 86,
    },
    {
      userId: 15,
      nickname: "슈가",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-18",
      participationRate: 78,
    },
    {
      userId: 16,
      nickname: "지민",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-20",
      participationRate: 89,
    },
    {
      userId: 17,
      nickname: "뷔",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-11",
      participationRate: 64,
    },
    {
      userId: 18,
      nickname: "정국",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-21",
      participationRate: 99,
    },
    {
      userId: 19,
      nickname: "장원영",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-13",
      participationRate: 77,
    },
    {
      userId: 20,
      nickname: "안유진",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-19",
      participationRate: 82,
    },
    {
      userId: 21,
      nickname: "가을",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-20",
      participationRate: 93,
    },
    {
      userId: 22,
      nickname: "레이",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-17",
      participationRate: 69,
    },
    {
      userId: 23,
      nickname: "리즈",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-16",
      participationRate: 84,
    },
    {
      userId: 24,
      nickname: "이서",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-18",
      participationRate: 71,
    },
    {
      userId: 25,
      nickname: "카리나",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-20",
      participationRate: 94,
    },
    {
      userId: 26,
      nickname: "윈터",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-14",
      participationRate: 66,
    },
    {
      userId: 27,
      nickname: "지젤",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-15",
      participationRate: 79,
    },
    {
      userId: 28,
      nickname: "닝닝",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-13",
      participationRate: 70,
    },
    {
      userId: 29,
      nickname: "하니",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-12",
      participationRate: 73,
    },
    {
      userId: 30,
      nickname: "다니엘",
      studyMemberRoleType: "스터디원",
      lastAttendanceDate: "2025-01-21",
      participationRate: 96,
    },
  ];
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
