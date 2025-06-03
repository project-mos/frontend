"use client";
import { useState } from "react";

import LoginModal from "@/features/login/components/LoginModal";
import Button from "@/shared/components/atoms/Button";
import useModal from "@/shared/hooks/useModal";
import ApplyFormCard from "./ApplyFormCard";

import { useQuestions } from "@/features/studies/services/studies.service";
import URL from "@/shared/constants/URL";
import { useAuthStore } from "@/shared/store/authStore";
import { useParams } from "next/navigation";

const Apply = () => {
  const { id } = useParams() as { id: string };

  const [isApplyVisibleState, setIsApplyVisibleState] =
    useState<boolean>(false);
  const { isModalOpenState, openModal, closeModal } = useModal();

  const { isLoggedIn } = useAuthStore();

  const { data: questionData } = useQuestions(id, isLoggedIn);

  function onClickButton() {
    if (isLoggedIn) {
      setIsApplyVisibleState(true);
    } else {
      openModal();
    }
  }
  const isTodayInRange = (start: string, end: string): boolean => {
    const today = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    // 날짜 비교를 위해 시간 제거
    const normalize = (date: Date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const normalizedToday = normalize(today);
    const normalizedStart = normalize(startDate);
    const normalizedEnd = normalize(endDate);

    return (
      normalizedToday >= normalizedStart && normalizedToday <= normalizedEnd
    );
  };

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

export default Apply;
