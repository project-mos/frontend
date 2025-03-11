"use client";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import StudyDescription from "../components/StudyDescription";
import StudyActions from "../components/StudyActions";
import ContentAdderBox from "../components/ContentAdderBox";
import ContentInputBox from "../components/ContentInputBox";

const CreateStudyForm2 = () => {
  const methods = useForm<FormData>();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log("data", data);
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
          <ContentAdderBox
            buttonText="커리큘럼 추가하기"
            description="커리큘럼을 추가하여 스터디 계획을 구체적으로 설명해보세요."
          />
          <ContentAdderBox
            buttonText="스터디 규칙 추가하기"
            description="스터디 규칙을 추가하여 참여자들이 지켜야 할 사항을 안내해보세요."
          />
          <ContentInputBox
            subTitle="스터디 규칙"
            buttonText="규칙 추가"
            placeholder="스터디 규칙을 입력하세요"
          />
          <ContentAdderBox
            buttonText="스터디 혜택 추가하기"
            description="스터디 혜택을 추가하여 참여자들에게 제공되는 장점을 설명해보세요."
          />

          <StudyActions solidLabel="다음 단계" ghostLabel="취소" />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm2;
