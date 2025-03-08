import Profile from "./components/Profile";
import Statistics from "./components/Statistics";
import StudySchedule from "./components/StudySchedule";
import ActiveStudies from "./components/ActiveStudies";

const MyPage = () => {
  return (
    <>
      <div className="col-span-4 flex flex-col gap-5">
        <Profile />
        <Statistics />
      </div>
      <StudySchedule />
      <ActiveStudies />
    </>
  );
};

export default MyPage;
