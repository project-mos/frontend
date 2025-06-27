import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import Badge from "@/shared/components/atoms/Badge";
import Typography from "@/shared/components/atoms/Typography";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useModal from "@/shared/hooks/useModal";

import StudyActions from "@/features/create-study/components/StudyActions";
import StudyBasicInfo from "@/features/create-study/components/StudyBasicInfo";
import StudyMethod from "@/features/create-study/components/StudyMethod";
import { StudyFormInterface } from "../types/create-study.type";

const CreateStudyForm1 = () => {
  const methods = useFormContext<StudyFormInterface>();
  const router = useRouter();
  const { isModalOpenState, openModal, closeModal } = useModal();

  const onSubmit = () => {
    router.push("/create-study?step=2");
  };

  const onClickCancelButton = () => {
    closeModal();
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
          onClickBackButton={openModal}
        />
      </form>

      <ActionConfirmModal
        isOpen={isModalOpenState}
        onClose={closeModal}
        onSuccess={onClickCancelButton}
        type="danger"
        title="취소하시겠습니까?"
        content="현재까지 작성하신 내용은 저장되지않습니다."
        buttonLabel="확인"
      />
    </div>
  );
};

export default CreateStudyForm1;
