"use client";

import React from "react";

import Button from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";

import editBenefit from "@/features/study-room/services/editBenefit.service";
import editRule from "@/features/study-room/services/editRule.service";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import { useToast } from "@/shared/hooks/useToast";
import { BenefitInterface, RuleInterface } from "./ManageOverviewCard";

interface ContentInputBoxProps {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
  placeholder: string;
  type: "rule" | "benefit";
  token: string;
  studyId: string;
}

interface InlineInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  placeholder: string;
}

const InlineInput = ({
  value,
  onChange,
  onRemove,
  placeholder,
}: InlineInputProps) => (
  <div className="flex">
    <Input
      value={value}
      onChange={onChange}
      className="w-full rounded-r-none placeholder:text-mos-gray-500"
      placeholder={placeholder}
    />
    <Button.Ghost
      type="button"
      color="Main"
      className="h-[47px] w-[50px] rounded-l-none"
      onClick={onRemove}
    >
      <i className="bi bi-trash text-mos-coral-500" />
    </Button.Ghost>
  </div>
);

const ContentInputBox = ({
  value,
  setValue,
  setState,
  buttonText,
  placeholder,
  type,
  token,
  studyId,
}: ContentInputBoxProps) => {
  const { modal, openModal, closeModal } = useMultiModal();
  const toast = useToast();

  const handleAddValue = () => {
    setValue([...value, ""]);
  };

  const handleEditValue = (index: number, text: string) => {
    const newValue = [...value];
    newValue[index] = text;
    setValue(newValue);
  };

  const handleDeleteValue = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    setValue(newValue);
  };

  const handleSubmit = async () => {
    const isRule = type === "rule";

    const arr = value.map((content, idx) =>
      isRule ? { content, ruleNum: idx + 1 } : { content, benefitNum: idx + 1 }
    );

    try {
      const result = isRule
        ? await editRule({
            token,
            studyId,
            rules: arr as RuleInterface[],
          })
        : await editBenefit({
            token,
            studyId,
            benefits: arr as BenefitInterface[],
          });

      if (!result.ok || result.status !== 200) {
        throw new Error("서버 응답 실패");
      }

      toast.success(`${isRule ? "규칙" : "혜택"} 수정을 완료하였습니다.`);
    } catch (error) {
      console.error(error);
      toast.error(`${isRule ? "규칙" : "혜택"} 수정에 실패하였습니다.`);
    } finally {
      closeModal("save");
      document.body.style.overflow = "auto";
      setState(false);
    }
  };

  const handleCancelButton = () => {
    closeModal("cancel");
    document.body.style.overflow = "auto";
    setState(false);
  };

  return (
    <>
      <form className="mt-4 px-4">
        <div className="flex flex-col gap-3">
          {value.map((data, index) => (
            <InlineInput
              key={index}
              value={data}
              onChange={(e) => handleEditValue(index, e.target.value)}
              onRemove={() => handleDeleteValue(index)}
              placeholder={placeholder}
            />
          ))}
        </div>
        <div className="flex w-full justify-between gap-2 py-4">
          <Button.Default
            type="button"
            className="h-[35px]"
            onClick={handleAddValue}
          >
            <i className="bi bi-plus" />
            {buttonText}
          </Button.Default>
          <div className="flex gap-4">
            <Button.Solid
              color="Main"
              type="button"
              onClick={() => openModal("cancel")}
              className="h-[35px]"
            >
              취소하기
            </Button.Solid>
            <Button.Solid
              active
              color="Main"
              type="button"
              onClick={() => openModal("save")}
              className="h-[35px]"
            >
              저장하기
            </Button.Solid>
          </div>
        </div>
      </form>
      <ActionConfirmModal
        isOpen={modal.get("cancel")!}
        onClose={() => closeModal("cancel")}
        onSuccess={handleCancelButton}
        type="danger"
        content="저장되지 않았습니다. 취소하시겠습니까?"
        title="취소하기"
        buttonLabel="예, 취소합니다"
      />
      <ActionConfirmModal
        isOpen={modal.get("save")!}
        onClose={() => closeModal("save")}
        onSuccess={handleSubmit}
        type="action"
        content="저장하시겠습니까?"
        title="저장하기"
        buttonLabel="저장하기"
      />
    </>
  );
};

export default ContentInputBox;
