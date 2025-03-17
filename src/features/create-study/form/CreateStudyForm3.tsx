import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import CreateStudyModal from "../components/CreateStudyModal";
import StudyActions from "../components/StudyActions";
import StudyApply from "../components/StudyApply";
import { StudyFormInterface } from "./CreateStudyForm";

const CreateStudyForm3 = () => {
  const methods = useFormContext<StudyFormInterface>();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onSubmit = () => {
    setIsOpenModal(true);
  };

  const handleClickBackButton = () => {
    router.push("/create-study?step=2");
  };

  const handleClickCreateButton = () => {
    setIsOpenModal(false);
    router.push("/create-study?step=4");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-auto flex w-full flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex w-full items-center justify-between">
        <Typography.Head3>스터디 만들기</Typography.Head3>
        <Badge>3/3 단계</Badge>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <StudyApply />
          <StudyActions
            solidLabel="스터디 만들기"
            ghostLabel="이전 단계"
            onClickBackButton={handleClickBackButton}
          />
        </form>
        {isOpenModal && (
          <CreateStudyModal
            title="스터디를 생성하시겠습니까?"
            descriptions={[]}
            setIsOpenModal={setIsOpenModal}
            confirmFunction={handleClickCreateButton}
          />
        )}
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm3;
