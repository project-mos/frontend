import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useFormContext } from "react-hook-form";
import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import StudyBasicInfo from "../components/StudyBasicInfo";
import StudyMethod from "../components/StudyMethod";
import StudyActions from "../components/StudyActions";
import { StudyFormInterface } from "./CreateStudyForm";
import useValidateForm from "../hooks/useValidateForm";

const CreateStudyForm1 = () => {
  const methods = useFormContext<StudyFormInterface>();
  const router = useRouter();
  const validateForm = useValidateForm();

  const onSubmit = (data: StudyFormInterface) => {
    if (validateForm(data)) {
      router.push("/create-study?step=2");
    }
  };

  const handleClickBackButton = () => {
    if (window.confirm("취소?")) {
      router.push("/");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-auto flex w-full flex-col gap-[20px] tablet:w-[85%]">
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
          <StudyActions
            solidLabel="다음 단계"
            ghostLabel="취소"
            onClickBackButton={handleClickBackButton}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm1;
