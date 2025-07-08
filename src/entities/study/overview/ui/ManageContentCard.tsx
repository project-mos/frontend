import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import CustomMdxRemote from "@/shared/components/system/CustomMdxRemote";
import { GetStudyDetailResponse } from "../../studies/api/studies.api.type";

interface ContentCardProps {
  data: GetStudyDetailResponse;
}

const ManageContentCard = ({ data }: ContentCardProps) => {
  return (
    <Card>
      <Card.Header className="mb-[10px] justify-between border-b pb-2">
        <Typography.SubTitle1>스터디 소개</Typography.SubTitle1>
      </Card.Header>

      <Card.Content className="prose prose-sm max-w-full">
        <CustomMdxRemote content={data.content} />
      </Card.Content>
    </Card>
  );
};

export default ManageContentCard;
