import ActiveStudies from "@/app/(auth)/mypage/components/ActiveStudies";
import ProfileCard from "@/app/(auth)/mypage/components/ProfileCard";
import Statistics from "@/app/(auth)/mypage/components/Statistics";
import StudySchedule from "@/app/(auth)/mypage/components/StudySchedule";

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
