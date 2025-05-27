import { getBenefits } from "@/features/studies/services/studies.service";
import ManageOverviewCard from "../../components/manage-overview/ManageOverviewCard";

interface StudyDetailPageProps {
  params: Promise<{ id: string }>;
}

const ManageOverview = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;
  const benefits = await getBenefits(id);
  console.log(benefits);
  return <ManageOverviewCard />;
};

export default ManageOverview;
