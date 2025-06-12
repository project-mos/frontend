import CurriculumCard from "@/app/(auth)/study-room/components/curriculum/CurriculumCard";

const Curriculum = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;

  return <CurriculumCard studyId={id} />;
};

export default Curriculum;
