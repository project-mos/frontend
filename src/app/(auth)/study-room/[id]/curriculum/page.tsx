import CurriculumCard from "@/entities/study/curriculum/ui/CurriculumCard";

const Curriculum = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;

  return <CurriculumCard studyId={id} />;
};

export default Curriculum;
