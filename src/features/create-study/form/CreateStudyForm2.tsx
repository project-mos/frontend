import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import Badge from "@/shared/components/atoms/Badge";
import Typography from "@/shared/components/atoms/Typography";
import URL from "@/shared/constants/URL";

import StudyActions from "@/app/create-study/components/StudyActions";
import StudyBenefits from "@/app/create-study/components/StudyBenefits";
import StudyDescription from "@/app/create-study/components/StudyDescription";
import StudyRules from "@/app/create-study/components/StudyRules";

import { StudyFormInterface } from "./CreateStudyForm";

const CreateStudyForm2 = () => {
  const methods = useFormContext<StudyFormInterface>();
  const router = useRouter();

  const onSubmit = () => {
    router.push(`${URL.STUDY.CREATE}?step=3`);
  };

  const handleClickBackButton = () => {
    router.push(`${URL.STUDY.CREATE}?step=1`);
  };

  return (
    <div className="m-auto flex w-full flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex w-full items-center justify-between">
        <Typography.Head3>스터디 만들기</Typography.Head3>
        <Badge>2/3 단계</Badge>
      </div>

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
        />
      </form>
    </div>
  );
};

export default CreateStudyForm2;
