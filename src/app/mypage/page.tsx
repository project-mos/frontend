import ActiveStudies from "@/features/mypage/components/ActiveStudies";
import Profile from "@/features/mypage/components/Profile";
import Statistics from "@/features/mypage/components/Statistics";
import StudySchedule from "@/features/mypage/components/StudySchedule";

const MyPage = () => {
  return (
    <>
      <div className="col-span-12 flex flex-col gap-5 tablet:col-span-4">
        <Profile />
        <Statistics />
      </div>
      <StudySchedule />
      <ActiveStudies />
    </>
  );
};

export default MyPage;
