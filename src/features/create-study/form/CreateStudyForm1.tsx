"use client";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import BasicInfo from "../components/BasicInfo";
import StudyMethod from "../components/StudyMethod";
import StudyActions from "../components/StudyActions";

const CreateStudyForm1 = () => {
  const methods = useForm<FormData>();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log("data", data);
    router.push("/create-study?step=2");
  };

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
          <BasicInfo />
          <StudyMethod />
          <StudyActions solidLabel="다음 단계" ghostLabel="취소" />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm1;
