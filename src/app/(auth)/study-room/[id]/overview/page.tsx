import {
  getBenefits,
  getRules,
} from "@/features/studies/services/studies.service";
import { StudyDetailPageProps } from "@/features/study-room/types/study-room.type";
import ManageOverviewCard from "../../components/manage-overview/ManageOverviewCard";

const ManageOverview = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;

  const benefits = (await getBenefits(id)).map((item) => item.content);
  const rules = (await getRules(id)).map((item) => item.content);

  return <ManageOverviewCard benefits={benefits} rules={rules} studyId={id} />;
};

export default ManageOverview;
