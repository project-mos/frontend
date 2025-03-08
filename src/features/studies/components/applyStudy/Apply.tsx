"use client";
import Button from "@/components/atoms/Button";
import { useState } from "react";
import ApplyFormCard from "./ApplyFormCard";

const Apply = () => {
  const [isApplyVisible, setIsApplyVisible] = useState<boolean>(false);
  return (
    <div className="col-span-12 flex flex-col items-center gap-5 tablet:col-span-8">
      {!isApplyVisible && (
        <Button.Solid
          color="Main"
          active
          onClick={() => setIsApplyVisible(true)}
        >
          지원하기
        </Button.Solid>
      )}
      {isApplyVisible && (
        <ApplyFormCard setIsApplyVisible={setIsApplyVisible} />
      )}
    </div>
  );
};

export default Apply;
