"use client";

import React from "react";

import Button from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";

interface ContentInputBoxProps {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
  placeholder: string;
  type: "rule" | "benefit";
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
}: ContentInputBoxProps) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arr =
      type === "rule"
        ? value.map((content, idx) => ({ content, ruleNum: idx + 1 }))
        : value.map((content, idx) => ({ content, benefitNum: idx + 1 }));

    console.log(arr);
    setState(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 px-4">
      <div className="flex flex-col gap-3">
        {value.map((data, index) => (
          <InlineInput
            key={data}
            value={data}
            onChange={(e) => handleEditValue(index, e.target.value)}
            onRemove={() => handleDeleteValue(index)}
            placeholder={placeholder}
          />
        ))}
      </div>
      <div className="flex w-full justify-end gap-2 py-4">
        <Button.Default
          type="button"
          className="h-[35px]"
          onClick={handleAddValue}
        >
          <i className="bi bi-plus" />
          {buttonText}
        </Button.Default>
        <Button.Solid active color="Main" type="submit" className="h-[35px]">
          저장하기
        </Button.Solid>
      </div>
    </form>
  );
};

export default ContentInputBox;
