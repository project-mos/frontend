import { getBenefits } from "@/entities/study/overview/api/benefits.api";
import { getRules } from "@/entities/study/overview/api/rules.api";
import ManageContentCard from "@/entities/study/overview/ui/ManageContentCard";
import ManageOverviewCard from "@/entities/study/overview/ui/ManageOverviewCard";
import { getStudy } from "@/entities/study/studies/api/studies.api";

import { StudyDetailPageProps } from "@/features/study-room/types/study-room.type";

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
