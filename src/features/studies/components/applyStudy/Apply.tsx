"use client";
import Button from "@/components/atoms/Button";
import { useState } from "react";
import ApplyFormCard from "./ApplyFormCard";

const Apply = () => {
  const [isApplyVisibleState, setIsApplyVisibleState] =
    useState<boolean>(false);
  return (
    <div className="col-span-12 flex flex-col items-center gap-5 tablet:col-span-8">
      {!isApplyVisibleState && (
        <Button.Solid
          color="Main"
          active
          onClick={() => setIsApplyVisibleState(true)}
        >
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
