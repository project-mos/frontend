import Card from "@/components/atoms/Card";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import Typography from "@/components/atoms/Typography";
import { useFormContext } from "react-hook-form";
import LabelDateInput from "./LabelDateInput";
import LabelInput from "./LabelInput";
import LabelNumberInput from "./LabelNumberInput";
import LabelSelectInput from "./LabelSelectInput";
import LabelTagInput from "./LabelTagInput";

const StudyBasicInfo = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const categoryList = ["ex1", "ex2", "ex3"];

  return (
    <Card className="pb-[40px]">
      <Card.Header className="mb-[30px]">
        <Typography.SubTitle1>기본 정보</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="flex flex-col gap-[25px]">
        <LabelInput
          name="name"
          label="스터디명"
          required
          placeholder="스터디명을 입력하세요"
        />
        {errors.name && (
          <ErrorMessage>{errors.name.message as string}</ErrorMessage>
        )}
        <LabelSelectInput
          name="category"
          label="카테고리"
          selectList={categoryList}
          required
        />
        {errors.category && (
          <ErrorMessage>{errors.category.message as string}</ErrorMessage>
        )}
        <LabelNumberInput
          name="person"
          label="모집 인원"
          placeholder="모집 인원을 입력하세요"
        />
        {errors.person && (
          <ErrorMessage>{errors.person.message as string}</ErrorMessage>
        )}
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
        {(errors.recruitmentStartDate || errors.recruitmentEndDate) && (
          <ErrorMessage>
            {(errors.recruitmentStartDate?.message as string) ?? ""}
          </ErrorMessage>
        )}
        <LabelTagInput
          name="tags"
          label="태그"
          placeholder="태그를 입력하새요"
        />
      </Card.Content>
    </Card>
  );
};

export default StudyBasicInfo;
