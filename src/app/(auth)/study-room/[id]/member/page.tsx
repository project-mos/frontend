import MemberCard from "@/app/(auth)/study-room/components/member/MemberCard";
import { getMembers } from "@/features/studies/services/studies.service";
import { StudyDetailPageProps } from "@/features/study-room/types/study-room.type";

const MemberPage = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;
  const members = await getMembers(id);

  return (
    <div className="grid grid-cols-8 gap-5">
      <MemberCard members={members} />
    </div>
  );
};

export default MemberPage;
