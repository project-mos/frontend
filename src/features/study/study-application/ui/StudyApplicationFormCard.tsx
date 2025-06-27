import { FormProvider } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";

import StudyApplicationInfoMessage from "@/features/study/study-application/ui/StudyApplicationInfoMessage";
import StudyApplicationFormFields from "@/features/study/study-application/ui/StudyApplicationFormFields";

import useStudyApplicationForm from "@/features/study/study-application/model/useStudyApplicationForm";
import { StudyApplyFormCardInterface } from "@/features/study/study-application/ui/study-application.ui.types";

const StudyApplicationFormCard = ({
  studyId,
  data,
  setIsApplyVisible,
}: StudyApplyFormCardInterface) => {
  const {
    methods, // react-hook-form methods
    joinStatusState,
    isButtonActive,
    getStatusText,
    onConfirmModalSuccess,
    modal,
    closeModal,
    onSubmitForm,
  } = useStudyApplicationForm({
    studyId,
    onSubmissionSuccess: () => {
      console.log("onSuccess callback called");
    },
  });

  return (
    <>
      <Card className="h-auto w-[85%] sm-mobile:w-full">
        <Card.Header className="mb-[15px]">
          <Typography.SubTitle1>지원양식</Typography.SubTitle1>
        </Card.Header>

        <Card.Content>
          <FormProvider {...methods}>
            <form onSubmit={onSubmitForm} className="flex flex-col gap-3">
              {(!joinStatusState ||
                joinStatusState === "REJECTED" ||
                joinStatusState === "CANCELED") && (
                <StudyApplicationFormFields questions={data} />
              )}

              {joinStatusState === "PENDING" && (
                <StudyApplicationInfoMessage>
                  이미 지원하셨습니다!
                  <br />
                  지원을 취소하시겠습니까?
                </StudyApplicationInfoMessage>
              )}
              {joinStatusState === "APPROVED" && (
                <StudyApplicationInfoMessage>
                  스터디에 가입되었습니다!
                  <br />
                  지원을 취소하시겠습니까?
                </StudyApplicationInfoMessage>
              )}

              <div className="flex justify-center gap-[10px]">
                <Button.Ghost
                  color="Gray"
                  className="w-[90px]"
                  active
                  onClick={() => setIsApplyVisible(false)}
                >
                  취소
                </Button.Ghost>
                <Button.Solid color="Main" active={isButtonActive}>
                  {getStatusText()}하기
                </Button.Solid>
              </div>
            </form>
          </FormProvider>
        </Card.Content>

        <Card.Footer>
          <div className="flex w-full gap-2"></div>
        </Card.Footer>
      </Card>
      <ActionConfirmModal
        isOpen={modal.get("submit")!}
        onClose={() => closeModal("submit")}
        onSuccess={onConfirmModalSuccess}
        type="action"
        content={`${getStatusText()}하시겠습니까?`}
        title={`스터디 ${getStatusText()}하기`}
        buttonLabel={`${getStatusText()}하기`}
      />
    </>
  );
};

export default StudyApplicationFormCard;
