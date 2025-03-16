import ActiveStudies from "@/features/mypage/components/ActiveStudies";
import ProfileCard from "@/features/mypage/components/ProfileCard";
import Statistics from "@/features/mypage/components/Statistics";
import StudySchedule from "@/features/mypage/components/StudySchedule";

const MyPage = () => {
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
