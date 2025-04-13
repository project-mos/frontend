import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

import LabelTextAreaInput from "../../../components/molecules/LabelTextAreaInput";

const StudyDescription = () => {
  return (
    <Card>
      <Card.Header className="mb-[40px]">
        <Typography.SubTitle1>스터디 설명</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="flex flex-col gap-[25px]">
        <LabelTextAreaInput
          label="참여 요건"
          name="requirements"
          placeholder="참여 요건을 작성해주세요"
        />
      </Card.Content>
    </Card>
  );
};

export default StudyDescription;
