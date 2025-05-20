"use client";
import { useState } from "react";

import Button from "@/shared/components/atoms/Button";
import ApplyFormCard from "./ApplyFormCard";
import LoginModal from "@/features/login/components/LoginModal";
import useModal from "@/shared/hooks/useModal";

import { useParams } from "next/navigation";
import URL from "@/shared/constants/URL";
import { useAuthStore } from "@/shared/store/authStore";

const Apply = () => {
  const { id } = useParams() as { id: string };

  const [isApplyVisibleState, setIsApplyVisibleState] =
    useState<boolean>(false);
  const { isModalOpenState, openModal, closeModal } = useModal();

  const { isLoggedIn } = useAuthStore();

  function onClickButton() {
    if (isLoggedIn) {
      setIsApplyVisibleState(true);
    } else {
      openModal();
    }
  }

  return (
    <div className="col-span-12 flex flex-col items-center gap-5 tablet:col-span-8">
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
      {isApplyVisibleState && (
        <ApplyFormCard setIsApplyVisible={setIsApplyVisibleState} />
      )}
    </div>
  );
};

export default Apply;
