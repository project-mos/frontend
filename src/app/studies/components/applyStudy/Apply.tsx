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
  const { data } = useQuestions(id, isLoggedIn);

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
      {!isApplyVisibleState && (
        <Button.Solid color="Main" active onClick={onClickButton}>
          지원하기
        </Button.Solid>
      )}
      {isApplyVisibleState && data && (
        <ApplyFormCard
          studyId={id}
          data={data}
          setIsApplyVisible={setIsApplyVisibleState}
        />
      )}
    </div>
  );
};

export default Apply;
