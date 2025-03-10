"use client";
import { FormProvider, useForm } from "react-hook-form";
import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import BasicInfo from "./BasicInfo";
import StudyMethod from "./StudyMethod";
import StudyActions from "./StudyActions";

const CreateStudyForm = () => {
  const methods = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("data", data);
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
          <BasicInfo />
          <StudyMethod />
          <StudyActions />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm;
