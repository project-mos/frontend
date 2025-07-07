import { getMembers } from "@/entities/study/member/api/member.api";
import MemberCard from "@/entities/study/member/ui/MemberCard";
import { StudyDetailPageProps } from "@/features/study-room/types/study-room.type";

const MemberPage = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;
  const members = await getMembers(id);

  return (
    <div className="grid grid-cols-8 gap-5">
      <MemberCard members={members} studyId={id} />
    </div>
  );
};

export default MemberPage;
