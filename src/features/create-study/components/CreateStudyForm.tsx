"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import LabelDateInput from "@/features/create-study/components/LabelDateInput";
import LabelInput from "@/features/create-study/components/LabelInput";
import LabelNumberInput from "@/features/create-study/components/LabelNumberInput";
import LabelSelectInput from "@/features/create-study/components/LabelSelectInput";
import LabelTagInput from "@/features/create-study/components/LabelTagInput";
import LabelRadioInput from "./LabelRadioInput";

const CreateStudyForm = () => {
  const categoryList = ["ex1", "ex2", "ex3"];
  const meetingTypes = [
    { label: "비대면", value: "online" },
    { label: "대면", value: "offline" },
    { label: "혼합", value: "hybrid" },
  ];

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<number>(4);
  const [recruitmentStartDate, setRecruitmentStartDate] = useState<string>("");
  const [recruitmentEndDate, setRecuitmentEndDate] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [meetingType, setMeetingType] = useState<
    "online" | "offline" | "hybrid"
  >("online");
  const [schedule, setSchedule] = useState<string>("");

  const methods = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log("data", data);
    console.log(category);
  };

  return (
    <div className="m-auto flex w-full max-w-[800px] flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex w-full items-center justify-between">
        <Typography.Head3>스터디 만들기</Typography.Head3>
        <Badge>1/2 단계</Badge>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <Card className="pb-[30px]">
            <Card.Header className="mb-[30px]">
              <Typography.SubTitle1>기본 정보</Typography.SubTitle1>
            </Card.Header>
            <Card.Content className="flex flex-col gap-[15px]">
              <LabelInput
                name="name"
                label="스터디명"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <LabelSelectInput
                label="카테고리"
                selectList={categoryList}
                onChange={(e) =>
                  setCategory((e.target as HTMLSelectElement).value)
                }
                required
              />
              <LabelNumberInput
                name="person"
                label="모집 인원"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
              />

              <div className="flex w-full flex-col gap-3 mobile:flex-row">
                <LabelDateInput
                  name="recruitmentStartDate"
                  label="모집 시작일"
                  value={recruitmentStartDate}
                  required
                  onChange={(e) => setRecruitmentStartDate(e.target.value)}
                />
                <LabelDateInput
                  name="recruitmentEndDate"
                  label="모집 마감일"
                  value={recruitmentEndDate}
                  required
                  onChange={(e) => setRecuitmentEndDate(e.target.value)}
                />
              </div>
              <LabelTagInput
                name="tags"
                tagList={tags}
                setTagList={setTags}
                label="태그"
              />
            </Card.Content>
          </Card>

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
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm;
