import { useParams, useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import Typography from "@/shared/components/atoms/Typography";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";

import { patchStudy } from "@/entities/study/studies/api/studies.api";
import { PatchStudyForm } from "@/entities/study/studies/api/studies.api.type";
import StudyActions from "@/features/create-study/ui/StudyActions";
import StudyBasicInfo from "@/features/create-study/ui/StudyBasicInfo";
import StudyMethod from "@/features/create-study/ui/StudyMethod";
import URL from "@/shared/constants/URL";
import useMultiModal from "@/shared/hooks/useMultiModal";
import StudyDescription from "../ui/StudyDescription";

const EditStudyForm1 = () => {
  const methods = useFormContext<PatchStudyForm>();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { modal, openModal, closeModal } = useMultiModal();

  const { watch } = useFormContext<PatchStudyForm>();
  const formData = watch();

  const onSubmit = () => {
    openModal("edit");
  };

  const onClickCancelButton = () => {
    closeModal("cancel");
    router.push(URL.HOME);
  };

  const handleClickCreateButton = async () => {
    await patchStudy({
      form: formData,
      studyId: id,
    });
    closeModal("edit");
    localStorage.setItem("edit", "true");

    router.replace(`${URL.STUDY_ROOM.DETAIL_MANAGE_OVERVIEW(id)}`);
  };

  return (
    <div className="m-auto flex w-full flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex w-full items-center justify-between">
        <Typography.Head3>스터디 수정하기</Typography.Head3>
      </div>

      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-[30px]"
      >
        <StudyBasicInfo />
        <StudyMethod />
        <StudyDescription />
        <StudyActions
          solidLabel="스터디 수정"
          ghostLabel="취소"
          onClickBackButton={() => openModal("cancel")}
        />
      </form>

      <ActionConfirmModal
        isOpen={modal.get("cancel")!}
        onClose={() => closeModal("cancel")}
        onSuccess={onClickCancelButton}
        type="danger"
        content="현재까지 작성하신 내용은 저장되지않습니다."
        title="취소하시겠습니까?"
        buttonLabel="취소하기"
      />
      <ActionConfirmModal
        isOpen={modal.get("edit")!}
        onClose={() => closeModal("edit")}
        onSuccess={handleClickCreateButton}
        type="action"
        content="스터디를 수정하시겠습니까?"
        title="스터디 수정"
        buttonLabel="수정하기"
      />
    </div>
  );
};

export default EditStudyForm1;
