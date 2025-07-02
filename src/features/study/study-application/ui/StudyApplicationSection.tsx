"use client";
import { useState } from "react";

import LoginModal from "@/features/login/ui/LoginModal";
import Button from "@/shared/components/atoms/Button";
import useModal from "@/shared/hooks/useModal";
import ApplyFormCard from "./StudyApplicationFormCard";

import { useAuthStore } from "@/entities/auth/model/auth.store";
import URL from "@/shared/constants/URL";

import { useGetQuestions } from "@/entities/study/question/model/question.queries";
import { isTodayInRange } from "@/features/study/study-application/lib";
import { StudyApplicationSectionProps } from "@/features/study/study-application/ui/study-application.ui.types";
import { useParams } from "next/navigation";

const StudyApplicationSection = ({ data }: StudyApplicationSectionProps) => {
  const { id } = useParams() as { id: string };

  const [isApplyVisibleState, setIsApplyVisibleState] =
    useState<boolean>(false);
  const { isModalOpenState, openModal, closeModal } = useModal();

  const { isLoggedIn } = useAuthStore();

  const { data: questionData } = useGetQuestions(id);

  function onClickButton() {
    if (isLoggedIn) {
      setIsApplyVisibleState(true);
    } else {
      openModal();
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <LoginModal
        isOpen={isModalOpenState}
        onClose={closeModal}
        redirectUrl={URL.STUDY.DETAIL(Number(id))}
      />
      {!isApplyVisibleState &&
        isTodayInRange(data.recruitmentStartDate, data.recruitmentEndDate) && (
          <Button.Solid color="Main" active onClick={onClickButton}>
            지원하기
          </Button.Solid>
        )}
      {isApplyVisibleState && questionData && (
        <ApplyFormCard
          studyId={id}
          data={questionData}
          setIsApplyVisible={setIsApplyVisibleState}
        />
      )}
    </div>
  );
};

export default StudyApplicationSection;
