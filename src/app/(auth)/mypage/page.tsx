import ActiveStudies from "@/widget/mypage/ui/ActiveStudies";
import ProfileCard from "@/widget/mypage/ui/ProfileCard";
import Statistics from "@/widget/mypage/ui/Statistics";
import StudySchedule from "@/widget/mypage/ui/StudySchedule";

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
