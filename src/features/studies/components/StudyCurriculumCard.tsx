import { MockStudyCurriculumApiResult } from "@/app/mock/api/studies";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import Curriculum from "@/features/studies/components/Curriculum";

const StudyCurriculumCard = () => {
  return (
    <Card className="col-span-8 flex flex-col">
      <Card.Header className="mb-[20px]">
        <Typography.SubTitle1>커리큘럼</Typography.SubTitle1>
      </Card.Header>
      <Card.Content>
        <Curriculum data={MockStudyCurriculumApiResult} />
      </Card.Content>
    </Card>
  );
};
export default StudyCurriculumCard;
