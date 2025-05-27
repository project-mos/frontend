import {
  getBenefits,
  getRules,
} from "@/features/studies/services/studies.service";
import ManageOverviewCard from "../../components/manage-overview/ManageOverviewCard";

interface StudyDetailPageProps {
  params: Promise<{ id: string }>;
}

const ManageOverview = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;

  const benefits = await getBenefits(id);
  const rules = await getRules(id);

  return <ManageOverviewCard benefits={benefits} rules={rules} />;
};

export default ManageOverview;
