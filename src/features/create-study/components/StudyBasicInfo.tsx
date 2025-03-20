import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import LabelInputDate from "./LabelInputDate";
import LabelInput from "./LabelInput";
import LabelNumberInput from "./LabelNumberInput";
import LabelSelectInput from "./LabelSelectInput";
import LabelTagInput from "./LabelTagInput";

const StudyBasicInfo = () => {
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
          registerOptions={{ required: "스터디명을 입력해주세요." }}
        />
        <LabelSelectInput
          name="category"
          label="카테고리"
          selectList={categoryList}
          required
          registerOptions={{ required: "카테고리를 선택해주세요" }}
        />
        <LabelNumberInput
          name="person"
          label="모집 인원"
          placeholder="모집 인원을 입력하세요"
          required
          registerOptions={{
            required: "카테고리를 선택해주세요",
            min: { value: 1, message: "한명 이상이어야 합니다" },
          }}
        />
        <div className="flex w-full flex-col gap-3 mobile:flex-row">
          <LabelInputDate
            name="recruitmentStartDate"
            label="모집 시작일"
            required
            registerOptions={{
              required: "모집 시작일을 선택해주세요",
              // valueAsDate: true,
            }}
          />
          <LabelInputDate
            name="recruitmentEndDate"
            label="모집 마감일"
            required
            registerOptions={{
              required: "모집 마감일을 선택해주세요",
              // valueAsDate: true,
            }}
          />
        </div>
        <LabelTagInput
          name="tags"
          label="태그"
          placeholder="태그를 입력하세요"
        />
      </Card.Content>
    </Card>
  );
};

export default StudyBasicInfo;
