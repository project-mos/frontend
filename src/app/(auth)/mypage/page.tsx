import ActiveStudies from "@/widget/mypage/ui/ActiveStudies";
import ProfileCard from "@/widget/mypage/ui/ProfileCard";
import Statistics from "@/widget/mypage/ui/Statistics";
import StudySchedule from "@/widget/mypage/ui/StudySchedule";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지 - StudyMos",
  description:
    "내가 참여한 스터디와 활동 현황을 확인하고 관리하세요. 스터디 일정, 통계, 활동 내역을 한눈에 볼 수 있습니다.",
  keywords: [
    "마이페이지",
    "스터디 관리",
    "내 스터디",
    "활동 현황",
    "스터디 일정",
  ],
};

const MyPage = async () => {
  return (
    <>
      <div className="col-span-12 flex flex-col gap-5 tablet:col-span-4">
        <ProfileCard />
        <Statistics />
      </div>
      <StudySchedule />
      <ActiveStudies />
    </>
  );
};

export default MyPage;
