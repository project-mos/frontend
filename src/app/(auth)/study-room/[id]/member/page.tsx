import MemberCard from "@/app/(auth)/study-room/components/member/MemberCard";
import { StudyDetailPageProps } from "@/features/study-room/types/study-room.type";

const MemberPage = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;
  console.log(id);
  return (
    <div className="grid grid-cols-8 gap-5">
      <MemberCard />
    </div>
  );
};

export default MemberPage;
