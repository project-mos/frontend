import ActiveStudies from "@/app/(auth)/mypage/components/ActiveStudies";
import ProfileCard from "@/app/(auth)/mypage/components/ProfileCard";
import Statistics from "@/app/(auth)/mypage/components/Statistics";
import StudySchedule from "@/app/(auth)/mypage/components/StudySchedule";
import { cookies } from "next/headers";

const MyPage = async () => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access-token")?.value;
  return (
    <>
      <div className="col-span-12 flex flex-col gap-5 tablet:col-span-4">
        <ProfileCard accessToken={accessToken} />
        <Statistics />
      </div>
      <StudySchedule />
      <ActiveStudies />
    </>
  );
};

export default MyPage;
