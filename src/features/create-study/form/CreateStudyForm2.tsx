"use client";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import StudyDescription from "../components/StudyDescription";
import StudyActions from "../components/StudyActions";
import StudyRules from "../components/StudyRules";
import StudyBenefits from "../components/StudyBenefits";
import StudyCurriculum from "../components/StudyCurriculum";

interface StudyForm2Interface {
  content: string;
  requirements?: string;
  rules?: string[];
  benefits?: string;
}

const CreateStudyForm2 = () => {
  const methods = useForm<StudyForm2Interface>();
  const router = useRouter();

  const onSubmit = (data: StudyForm2Interface) => {
    console.log(data);
    router.push("/create-study?step=3");
  };

  return (
    <div className="m-auto flex w-full max-w-[800px] flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex w-full items-center justify-between">
        <Typography.Head3>스터디 만들기</Typography.Head3>
        <Badge>2/3 단계</Badge>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <StudyDescription />
          <StudyCurriculum />
          <StudyRules />
          <StudyBenefits />

          <StudyActions solidLabel="다음 단계" ghostLabel="이전 단계" />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm2;
