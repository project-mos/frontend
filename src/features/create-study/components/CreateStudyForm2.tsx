"use client";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";

const CreateStudyForm2 = () => {
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
        <Badge>2/3 단계</Badge>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <div></div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm2;
