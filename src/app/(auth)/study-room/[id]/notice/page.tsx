import NoticeCard from "@/entities/notice/ui/NoticeCard";

const Notice = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;

  return <NoticeCard studyId={Number(id)} />;
};

export default Notice;
