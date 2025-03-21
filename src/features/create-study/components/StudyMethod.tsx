import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import LabelRadioInput from "../../../components/molecules/LabelRadioInput";
import LabelInput from "../../../components/molecules/LabelInput";

const StudyMethod = () => {
  const meetingTypes = [
    { label: "비대면", value: "online" },
    { label: "대면", value: "offline" },
    { label: "혼합", value: "hybrid" },
  ];

  return (
    <Card className="pb-[40px]">
      <Card.Header className="mb-[30px]">
        <Typography.SubTitle1>진행 방식</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="flex flex-col gap-[25px]">
        <LabelRadioInput
          name="meetingType"
          label="스터디 방식"
          options={meetingTypes}
          required
          registerOptions={{ required: "스터디 방식을 선택해주세요" }}
        />
        <LabelInput
          name="schedule"
          label="진행 시간"
          placeholder="예: 매주 화요일 오후 8시"
          required
          registerOptions={{ required: "진행 시간을 입력해주세요" }}
        />
      </Card.Content>
    </Card>
  );
};

export default StudyMethod;
