import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import LabelInput from "@/shared/components/molecules/LabelInput";
import LabelInputDate from "@/shared/components/molecules/LabelInputDate";
import LabelNumberInput from "@/shared/components/molecules/LabelNumberInput";
import LabelSelectInput from "@/shared/components/molecules/LabelSelectInput";
import { useFormContext } from "react-hook-form";
import LabelTagInput from "./LabelTagInput";

const StudyBasicInfo = () => {
  const categoryList = ["프로그래밍", "어학", "자격증", "독서", "취미"];

  const { watch } = useFormContext();
  const recruitmentStartDate =
    watch("recruitmentStartDate") || new Date().toISOString().split("T")[0];

  return (
    <Card className="pb-[40px]">
      <Card.Header className="mb-[30px]">
        <Typography.SubTitle1>기본 정보</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="flex flex-col gap-[25px]">
        <LabelInput
          name="title"
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
          name="maxStudyMemberCount"
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
              min: {
                value: new Date().toISOString().split("T")[0],
                message: "모집 시작 날짜는 오늘 이후여야 합니다.",
              },
            }}
          />
          <LabelInputDate
            name="recruitmentEndDate"
            label="모집 마감일"
            required
            registerOptions={{
              required: "모집 마감일을 선택해주세요",
              min: {
                value: recruitmentStartDate,
                message: "모집 마감 날짜는 시작 날짜 이후여야 합니다.",
              },
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
