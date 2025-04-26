"use client";

import React, { SetStateAction } from "react";

import Button from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";

interface ContentInputBoxProps {
  value: { id: number; text: string }[];
  setValue: React.Dispatch<
    React.SetStateAction<{ id: number; text: string }[]>
  >;
  setState: React.Dispatch<SetStateAction<boolean>>;
  buttonText: string;
  placeholder: string;
}

interface InlineInputProps {
  value: { id: number; text: string };
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
      value={value.text}
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
}: ContentInputBoxProps) => {
  const handleAddValue = () => {
    setValue([...value, { id: value.length + 1, text: "" }]);
  };

  const handleEditValue = (index: number, text: string) => {
    const newValue = [...value];
    newValue[index].text = text;
    setValue(newValue);
  };

  const handleDeleteValue = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    setValue(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
    setState(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 px-4">
      <div className="flex flex-col gap-3">
        {value.map((data, index) => (
          <InlineInput
            key={data.id}
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
