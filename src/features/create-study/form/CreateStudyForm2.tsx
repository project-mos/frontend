import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import URL from "@/constants/URL";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import StudyActions from "../components/StudyActions";
import StudyBenefits from "../components/StudyBenefits";
import StudyDescription from "../components/StudyDescription";
import StudyRules from "../components/StudyRules";
import useValidateForm2 from "../hooks/usdValidateForm2";
import useStep2ButtonState from "../hooks/useStep2ButtonState";
import { StudyFormInterface } from "./CreateStudyForm";

const CreateStudyForm2 = () => {
  const methods = useFormContext<StudyFormInterface>();
  const router = useRouter();
  const validateForm = useValidateForm2();
  const isStep2Valid = useStep2ButtonState();

  const onSubmit = (data: StudyFormInterface) => {
    if (validateForm(data)) {
      methods.setValue("step2Completed", true);
      router.push(`${URL.STUDY.CREATE}?step=3`);
    }
  };

  const handleClickBackButton = () => {
    router.push(`${URL.STUDY.CREATE}?step=1`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-auto flex w-full flex-col gap-[20px] tablet:w-[85%]">
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
          <StudyRules />
          <StudyBenefits />
          <StudyActions
            solidLabel="다음 단계"
            ghostLabel="이전 단계"
            onClickBackButton={handleClickBackButton}
            active={isStep2Valid}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm2;
