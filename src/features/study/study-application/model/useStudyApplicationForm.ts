// features/study-application/model/useStudyApplicationForm.ts
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useMultiModal from "@/shared/hooks/useMultiModal";
import { useToast } from "@/shared/hooks/useToast";

import { Join, PostJoin } from "@/entities/study/join/api/join.api.type";

import {
  useGetJoins,
  usePatchJoin,
  usePostJoin,
} from "@/entities/study/join/model/join.query";

interface UseStudyApplicationFormProps {
  studyId: string;
  onSubmissionSuccess: () => void; // 폼 제출 성공 시 호출될 콜백
}

/**
 * 스터디 지원 폼의 모든 비즈니스 로직을 관리하는 커스텀 훅.
 * 폼 상태, 데이터 페칭, 제출, 지원 상태 관리 등을 처리합니다.
 */
const useStudyApplicationForm = ({
  studyId,
  onSubmissionSuccess,
}: UseStudyApplicationFormProps) => {
  const { id: paramId } = useParams() as { id: string }; // URL 파라미터에서 studyId 가져옴
  const methods = useForm({ mode: "onChange" });
  const { handleSubmit, formState, getValues } = methods;

  const { modal, openModal, closeModal } = useMultiModal();
  const { success: toastSuccess, error: toastError } = useToast();

  const { data: joinData } = useGetJoins();
  console.log("joinData", joinData);

  const [joinStatusState, setJoinStatusState] =
    useState<Join["studyJoinStatus"]>();
  const [joinIdState, setJoinIdState] = useState<Join["studyJoinId"]>();

  // 뮤테이션 성공/실패 시 공통 옵션
  const mutateOptions = {
    options: {
      onSuccess: () => {
        if (getStatusText() === "지원 취소") {
          toastSuccess(`스터디 ${getStatusText()}가 완료되었습니다.`);
        } else {
          toastSuccess(`스터디 ${getStatusText()}이 완료되었습니다.`);
        }
        onSubmissionSuccess(); // 상위 컴포넌트로 성공 이벤트 전달
      },
      onError: (err: unknown) => {
        if (err instanceof Error) {
          toastError(`${err.message}`);
        } else {
          toastError(`알 수 없는 오류가 발생했습니다.`);
        }
      },
    },
  };

  const { mutate: postMutate } = usePostJoin(mutateOptions);

  const { mutate: patchMutate } = usePatchJoin(mutateOptions);

  // 지원 버튼 활성화 여부 로직
  const isButtonActive =
    joinStatusState === "APPROVED" || joinStatusState === "PENDING"
      ? true
      : formState.isValid;

  // 폼 제출 핸들러 (확인 모달 열기)
  const onSubmitForm = useCallback(() => {
    openModal("submit");
  }, [openModal]);

  // 확인 모달에서 '확인' 클릭 시 실제 제출/취소 로직 실행
  const onConfirmModalSuccess = useCallback(async () => {
    switch (joinStatusState) {
      case "APPROVED":
      case "PENDING":
        await patchMutate({
          studyId,
          studyJoinId: String(joinIdState!),
        });
        break;
      case "REJECTED":
      default:
        const data = getValues();
        const transformedPostAPI: PostJoin = Object.entries(data).map(
          ([key, value]) => ({
            studyQuestionId: Number(key),
            answer: value,
          })
        );
        await postMutate({ studyId, data: transformedPostAPI });
        break;
    }
    closeModal("submit");
  }, [joinStatusState, getValues, postMutate, patchMutate, closeModal]);

  // join 상태 뽑기
  useEffect(() => {
    const filteringStudyJoining = joinData?.find(
      (items) => items.studyId === Number(paramId) // URL 파라미터 id 사용
    );
    if (filteringStudyJoining) {
      const { studyJoinStatus, studyJoinId } = filteringStudyJoining as Join;
      setJoinStatusState(studyJoinStatus);
      setJoinIdState(studyJoinId);
    }
  }, [joinData]);

  // 현재 지원 상태에 따른 텍스트 반환
  const getStatusText = useCallback(() => {
    switch (joinStatusState) {
      case "APPROVED":
      case "PENDING":
        return "지원 취소";
      case "REJECTED":
        return "다시 지원";
      case "CANCELED": // CANCELED 상태 추가 고려
        return "지원";
      default:
        return "지원";
    }
  }, [joinStatusState]);

  // 스터디 지원 상태 조회 및 업데이트
  useEffect(() => {
    console.log("useEffect: joinData", joinData);
    if (joinData) {
      const filteringStudyJoining = joinData.find(
        (items) => items.studyId === Number(studyId)
      );
      if (filteringStudyJoining) {
        const { studyJoinStatus, studyJoinId } = filteringStudyJoining as Join;
        setJoinStatusState(studyJoinStatus);
        setJoinIdState(studyJoinId);
      } else {
        // 해당 스터디에 대한 join 정보가 없는 경우 초기화
        setJoinStatusState(undefined);
        setJoinIdState(undefined);
      }
    }
  }, [joinData, studyId]);

  return {
    methods, // react-hook-form methods
    joinStatusState,
    isButtonActive,
    getStatusText,
    onSubmitForm: handleSubmit(onSubmitForm), // handleSubmit으로 감싸서 반환
    onConfirmModalSuccess,
    modal,
    joinIdState,
    closeModal,
    setJoinStatusState,
    openModal,
    setJoinIdState,
    joinData,
  };
};

export default useStudyApplicationForm;
