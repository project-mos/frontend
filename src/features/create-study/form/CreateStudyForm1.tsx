import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import CreateStudyModal from "../components/CreateStudyModal";
import StudyActions from "../components/StudyActions";
import StudyBasicInfo from "../components/StudyBasicInfo";
import StudyMethod from "../components/StudyMethod";
import { StudyFormInterface } from "./CreateStudyForm";

const CreateStudyForm1 = () => {
  const methods = useFormContext<StudyFormInterface>();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onSubmit = () => {
    router.push("/create-study?step=2");
  };

  const handleClickBackButton = () => {
    setIsOpenModal(true);
  };

  const handleClickCancelButton = () => {
    setIsOpenModal(false);
    router.push("/");
  };

  return (
    <div className="m-auto flex w-full flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex w-full items-center justify-between">
        <Typography.Head3>스터디 만들기</Typography.Head3>
        <Badge>1/3 단계</Badge>
      </div>

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

      {isOpenModal && (
        <CreateStudyModal
          title="취소하시겠습니까?"
          descriptions={["현재까지 작성하신 내용은", "저장되지않습니다."]}
          setIsOpenModal={setIsOpenModal}
          confirmFunction={handleClickCancelButton}
        />
      )}
    </div>
  );
};

export default CreateStudyForm1;
