import ActiveStudies from "@/app/mypage/components/ActiveStudies";
import ProfileCard from "@/app/mypage/components/ProfileCard";
import Statistics from "@/app/mypage/components/Statistics";
import StudySchedule from "@/app/mypage/components/StudySchedule";

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
