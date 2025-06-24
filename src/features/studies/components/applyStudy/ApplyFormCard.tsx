import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import LabelTextAreaInput from "@/shared/components/molecules/LabelTextAreaInput";

import LabelRadioInput from "@/shared/components/molecules/LabelRadioInput";

import { useTokenStore } from "@/entities/auth/store/auty.store";
import { useToast } from "@/shared/hooks/useToast";

import {
  useGetJoins,
  usePatchJoin,
  usePostJoin,
} from "@/features/studies/hooks/useStudiesQueries";
import {
  GetStudyQuestionsResponse,
  PostStudyJoin,
  StudyJoin,
} from "@/features/studies/types/studies.api";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import { useParams } from "next/navigation";

interface ApplyFormCardInterface {
  studyId: string;
  data: GetStudyQuestionsResponse;
  setIsApplyVisible: Dispatch<SetStateAction<boolean>>;
}

const ApplyFormCard = ({
  studyId,
  data,
  setIsApplyVisible,
}: ApplyFormCardInterface) => {
  const { id } = useParams() as { id: string };
  const methods = useForm({
    mode: "onChange",
  });
  const { handleSubmit, formState, getValues } = methods;
  const { accessToken } = useTokenStore();
  const { modal, openModal, closeModal } = useMultiModal();
  const { success, error } = useToast();

  const { data: JoinData } = useGetJoins({ accessToken });

  const [joinStatusState, setJoinStatusState] =
    useState<StudyJoin["studyJoinStatus"]>();
  const [joinIdState, setJoinIdState] = useState<StudyJoin["studyJoinId"]>();

  const mutateOption = {
    onSuccess: () => {
      if (getStatusText() === "지원 취소") {
        success(`스터디 ${getStatusText()}가 완료되었습니다.`);
      } else {
        success(`스터디 ${getStatusText()}이 완료되었습니다.`);
      }
      setIsApplyVisible(false);
      // router.replace(URL.HOME);
    },
    onError: (err: Error) => {
      error(`${err.message}`);
    },
  };

  const { mutate: postMutate } = usePostJoin({
    studyId,
    options: mutateOption,
  });

  const { mutate: patchMutate } = usePatchJoin({
    studyId,
    studyJoinId: String(joinIdState!),
    options: mutateOption,
  });

  const isButtonActive =
    joinStatusState === "APPROVED" || joinStatusState === "PENDING"
      ? true
      : formState.isValid;

  const onSubmit = async () => {
    openModal("submit");
  };

  // 지원하기 버튼 누를 시 동작 함수
  const onConfirmModalSuccess = async () => {
    switch (joinStatusState) {
      // 지원 취소
      case "APPROVED":
      case "PENDING":
        await patchMutate({});
        break;
      // 다시 지원 & 지원하기
      case "REJECTED":
      default:
        const data = getValues();
        const transformedPostAPI: PostStudyJoin = Object.entries(data).map(
          ([key, value]) => ({
            studyQuestionId: Number(key),
            answer: value,
          })
        );
        await postMutate(transformedPostAPI);
        break;
    }
    closeModal("submit");
  };

  // join status에 따라서 text 추출
  const getStatusText = useCallback(() => {
    switch (joinStatusState) {
      case "APPROVED":
      case "PENDING":
        return "지원 취소";
      case "REJECTED":
        return "다시 지원";
      default:
        return "지원";
    }
  }, [joinStatusState]);

  // join form render 함수
  const renderJoinForm = (data: GetStudyQuestionsResponse) => {
    return data.length > 0 ? (
      data.map((item, index) => {
        if (item.type === "주관식") {
          return TextareaField(item.question, String(item.id), item.required);
        } else {
          const options = item.options.map((options) => {
            return { label: options, value: options };
          });
          return (
            <LabelRadioInput
              key={`${item}_${index}`}
              name={String(item.id)}
              label={item.question}
              options={options}
              required={item.required}
              registerOptions={getRegisterOptions(item.required)}
            />
          );
        }
      })
    ) : (
      <>
        <InfoField>
          이 모집은 별도의 지원 양식을 사용하지 않습니다.
          <br />
          자유롭게 지원해주세요!
        </InfoField>
      </>
    );
  };

  // join 상태 뽑기
  useEffect(() => {
    const filteringStudyJoining = JoinData?.find(
      (items) => items.studyId === Number(id)
    );
    if (filteringStudyJoining) {
      const { studyJoinStatus, studyJoinId } =
        filteringStudyJoining as StudyJoin;
      setJoinStatusState(studyJoinStatus);
      setJoinIdState(studyJoinId);
    }
  }, [JoinData]);

  return (
    <>
      <Card className="h-auto w-[85%] sm-mobile:w-full">
        <Card.Header className="mb-[15px]">
          <Typography.SubTitle1>지원양식</Typography.SubTitle1>
        </Card.Header>

        <Card.Content>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              {(!joinStatusState ||
                joinStatusState === "REJECTED" ||
                joinStatusState === "CANCELED") &&
                renderJoinForm(data)}

              {joinStatusState === "PENDING" && (
                <InfoField>
                  이미 지원하셨습니다!
                  <br />
                  지원을 취소하시겠습니까?
                </InfoField>
              )}
              {joinStatusState === "APPROVED" && (
                <InfoField>
                  스터디에 가입되었습니다!
                  <br />
                  지원을 취소하시겠습니까?
                </InfoField>
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

const getRegisterOptions = (required: boolean) => {
  return {
    required: required ? "필수 입력 항목입니다." : false,
  };
};

const TextareaField = (label: string, name: string, required: boolean) => {
  return (
    <div className="mb-[10px]" key={`${label}_${name}`}>
      <LabelTextAreaInput
        label={label}
        name={name}
        placeholder="내용을 입력해 주세요."
        required={required}
        registerOptions={getRegisterOptions(required)}
      />
    </div>
  );
};

const InfoField = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center p-10">
      <Typography.SubTitle1 className="text-center text-mos-gray-500">
        {children}
      </Typography.SubTitle1>
    </div>
  );
};

export default ApplyFormCard;
