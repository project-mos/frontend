"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import StudyBasicInfo from "../components/StudyBasicInfo";
import StudyMethod from "../components/StudyMethod";
import StudyActions from "../components/StudyActions";

interface StudyForm1Interface {
  category: string;
  meetingType: string;
  name: string;
  person: string;
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  schedule: string;
}

const CreateStudyForm1 = () => {
  const methods = useForm<StudyForm1Interface>();
  const { setError } = methods;
  const router = useRouter();

  const validateForm = (data: StudyForm1Interface) => {
    let isValid = true;

    if (!data.name.trim()) {
      setError("name", { message: "스터디명은 필수 입력사항입니다." });
      isValid = false;
    }

    if (!data.person.trim()) {
      setError("person", { message: "모집 인원은 필수 입력사항입니다." });
      isValid = false;
    } else if (parseInt(data.person) <= 0) {
      setError("person", { message: "모집 인원은 1명 이상이어야 합니다." });
      isValid = false;
    }

    if (!data.recruitmentStartDate || !data.recruitmentEndDate) {
      setError("recruitmentStartDate", {
        message: "모집 시작일과 마감일은 필수 입력사항입니다.",
      });
      setError("recruitmentEndDate", {
        message: "모집 시작일과 마감일은 필수 입력사항입니다.",
      });
      isValid = false;
    }

    if (!data.meetingType) {
      setError("meetingType", {
        message: "스터디 방식은 필수 입력사항입니다.",
      });
      isValid = false;
    }

    if (!data.schedule.trim()) {
      setError("schedule", { message: "진행 시간은 필수 입력사항입니다." });
      isValid = false;
    }

    if (!isValid) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    }
    return isValid;
  };

  const onSubmit = (data: StudyForm1Interface) => {
    if (validateForm(data)) {
      router.push("/create-study?step=2");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-auto flex w-full max-w-[800px] flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex w-full items-center justify-between">
        <Typography.Head3>스터디 만들기</Typography.Head3>
        <Badge>1/3 단계</Badge>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <StudyBasicInfo />
          <StudyMethod />
          <StudyActions solidLabel="다음 단계" ghostLabel="취소" />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm1;
