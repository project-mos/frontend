import {
  getBenefits,
  getRules,
  getStudy,
} from "@/features/studies/services/studies.service";
import { StudyDetailPageProps } from "@/features/study-room/types/study-room.type";
import ManageOverviewCard from "../../components/manage-overview/ManageOverviewCard";

import ManageContentCard from "@/app/(auth)/study-room/components/manage-overview/ManageContentCard";

const ManageOverview = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;

  const benefits = (await getBenefits(id)).map((item) => item.content);
  const rules = (await getRules(id)).map((item) => item.content);
  const studyDetailData = await getStudy(id);

  return (
    <div className="col-span-12 h-fit tablet:col-span-9 laptop:col-span-10">
      <ManageContentCard data={studyDetailData} />
      <ManageOverviewCard benefits={benefits} rules={rules} studyId={id} />
    </div>
  );
};

export default ManageOverview;
