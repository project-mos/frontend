import { useState } from "react";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import LabelRadioInput from "./LabelRadioInput";
import LabelInput from "./LabelInput";

const StudyMethod = () => {
  const meetingTypes = [
    { label: "비대면", value: "online" },
    { label: "대면", value: "offline" },
    { label: "혼합", value: "hybrid" },
  ];

  const [meetingType, setMeetingType] = useState<
    "online" | "offline" | "hybrid"
  >("online");
  const [schedule, setSchedule] = useState<string>("");

  return (
    <Card className="pb-[30px]">
      <Card.Header className="mb-[30px]">
        <Typography.SubTitle1>진행 방식</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="flex flex-col gap-[15px]">
        <LabelRadioInput
          name="meetingType"
          label="스터디 방식"
          options={meetingTypes}
          selectedValue={meetingType}
          onChange={(value) =>
            setMeetingType(value as "online" | "offline" | "hybrid")
          }
          required
        />
        <LabelInput
          name="duration"
          label="진행 시간"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          placeholder="예: 매주 화요일 오후 8시"
          required
        />
      </Card.Content>
    </Card>
  );
};

export default StudyMethod;
