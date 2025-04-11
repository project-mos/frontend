import useModal from "@/app/hooks/useModal";
import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import ActionConfirmModal from "@/components/molecules/ActionConfirmModal";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import StudyActions from "../components/StudyActions";
import StudyBasicInfo from "../components/StudyBasicInfo";
import StudyMethod from "../components/StudyMethod";
import { StudyFormInterface } from "./CreateStudyForm";

const CreateStudyForm1 = () => {
  const methods = useFormContext<StudyFormInterface>();
  const router = useRouter();
  const { modal, openModal, closeModal } = useModal();

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
        isOpen={modal}
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
