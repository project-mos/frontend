import { StudyDetailPageProps } from "@/features/study-room/types/study-room.type";
import SettingCard from "../../../../../entities/study/setting/ui/SettingCard";

const SettingPage = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;

  return <SettingCard studyId={id} />;
};

export default SettingPage;
