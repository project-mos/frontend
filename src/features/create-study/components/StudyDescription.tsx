import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

import LabelTextAreaInput from "./LabelTextAreaInput";
import LabelEditor from "./LabelEditor";

const StudyDescription = () => {
  return (
    <Card>
      <Card.Header className="mb-[30px]">
        <Typography.SubTitle1>스터디 설명</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="flex flex-col gap-[15px]">
        <LabelEditor label="스터디 설명" name="description" required />
        <LabelTextAreaInput label="참여 요건" name="requirements" required />
      </Card.Content>
    </Card>
  );
};

export default StudyDescription;
