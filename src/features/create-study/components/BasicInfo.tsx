import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import LabelInput from "./LabelInput";
import LabelSelectInput from "./LabelSelectInput";
import LabelNumberInput from "./LabelNumberInput";
import LabelDateInput from "./LabelDateInput";
import LabelTagInput from "./LabelTagInput";

const BasicInfo = () => {
  const categoryList = ["ex1", "ex2", "ex3"];

  return (
    <Card className="pb-[30px]">
      <Card.Header className="mb-[30px]">
        <Typography.SubTitle1>기본 정보</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="flex flex-col gap-[15px]">
        <LabelInput name="name" label="스터디명" required />
        <LabelSelectInput label="카테고리" selectList={categoryList} required />
        <LabelNumberInput name="person" label="모집 인원" />
        <div className="flex w-full flex-col gap-3 mobile:flex-row">
          <LabelDateInput
            name="recruitmentStartDate"
            label="모집 시작일"
            required
          />
          <LabelDateInput
            name="recruitmentEndDate"
            label="모집 마감일"
            required
          />
        </div>
        <LabelTagInput name="tags" label="태그" />
      </Card.Content>
    </Card>
  );
};

export default BasicInfo;
