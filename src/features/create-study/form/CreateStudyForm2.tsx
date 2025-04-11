import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import URL from "@/constants/URL";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import StudyActions from "../components/StudyActions";
import StudyBenefits from "../components/StudyBenefits";
import StudyDescription from "../components/StudyDescription";
import StudyRules from "../components/StudyRules";
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

  const { watch } = methods;
  const isStep1Completed =
    watch("name") &&
    watch("category") &&
    watch("recruitmentStartDate") &&
    watch("recruitmentEndDate") &&
    watch("meetingType") &&
    watch("schedule");

  useEffect(() => {
    if (!isStep1Completed) {
      router.push(`${URL.STUDY.CREATE}?step=1`);
    }
  }, []);

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
