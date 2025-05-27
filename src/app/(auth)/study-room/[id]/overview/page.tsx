import {
  getBenefits,
  getRules,
} from "@/features/studies/services/studies.service";
import { cookies } from "next/headers";
import ManageOverviewCard from "../../components/manage-overview/ManageOverviewCard";

interface StudyDetailPageProps {
  params: Promise<{ id: string }>;
}

const ManageOverview = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access-token")?.value;

  const benefits = (await getBenefits(id)).map((item) => item.content);
  const rules = (await getRules(id)).map((item) => item.content);

  return (
    <ManageOverviewCard
      benefits={benefits}
      rules={rules}
      token={accessToken!}
      studyId={id}
    />
  );
};

export default ManageOverview;
