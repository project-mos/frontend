import ManageContentCard from "@/entities/study/overview/ui/ManageContentCard";
import ManageOverviewCard from "@/entities/study/overview/ui/ManageOverviewCard";
import {
  getBenefits,
  getRules,
  getStudy,
} from "@/features/studies/services/studies.service";
import { StudyDetailPageProps } from "@/features/study-room/types/study-room.type";

const ManageOverview = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;

  const benefits = (await getBenefits(id)).map((item) => item.content);
  const rules = (await getRules(Number(id))).map((item) => item.content);
  const studyDetailData = await getStudy(id);

  return (
    <div className="col-span-12 h-fit tablet:col-span-9 laptop:col-span-10">
      <ManageContentCard data={studyDetailData} />
      <ManageOverviewCard benefits={benefits} rules={rules} studyId={id} />
    </div>
  );
};

export default ManageOverview;
