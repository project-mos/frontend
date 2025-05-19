import { useRouter } from "next/navigation";
import { FormProvider, useFormContext } from "react-hook-form";

import Badge from "@/shared/components/atoms/Badge";
import Typography from "@/shared/components/atoms/Typography";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";

import StudyActions from "@/app/create-study/components/StudyActions";
import StudyApply from "@/app/create-study/components/StudyApply";
import useModal from "@/shared/hooks/useModal";

import createStudy from "../services/createStudy.service";
import {
  AccessTokenProps,
  StudyFormInterface,
} from "../types/create-study.type";

const CreateStudyForm3 = ({ accessToken }: AccessTokenProps) => {
  const methods = useFormContext<StudyFormInterface>();
  const router = useRouter();
  const { watch } = useFormContext<StudyFormInterface>();
  const formData = watch();

  const { isModalOpenState, openModal, closeModal } = useModal();

  const onSubmit = () => {
    openModal();
  };

  const handleClickBackButton = () => {
    router.push("/create-study?step=2");
  };

  const handleClickCreateButton = async () => {
    const result = await createStudy({
      form: formData,
      token: accessToken!,
    });
    closeModal();
    const studyID = result.studyId;
    router.replace(`/studies/${studyID}`);
  };

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

        <ActionConfirmModal
          isOpen={isModalOpenState}
          onClose={closeModal}
          onSuccess={handleClickCreateButton}
          type="action"
          title="스터디 생성"
          content="스터디를 생성하시겠습니까?"
          buttonLabel="확인"
        />
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm3;
