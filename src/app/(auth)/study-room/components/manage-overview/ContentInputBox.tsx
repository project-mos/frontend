"use client";

import React from "react";

import Button from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";

interface ContentInputBoxProps<T extends { id: number; content: string }> {
  value: T[];
  setValue: React.Dispatch<React.SetStateAction<T[]>>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
  placeholder: string;
}

interface InlineInputProps<T> {
  value: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  placeholder: string;
}

const InlineInput = <T extends { content: string }>({
  value,
  onChange,
  onRemove,
  placeholder,
}: InlineInputProps<T>) => (
  <div className="flex">
    <Input
      value={value.content}
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

const ContentInputBox = <
  T extends {
    id: number;
    content: string;
  }
>({
  value,
  setValue,
  setState,
  buttonText,
  placeholder,
}: ContentInputBoxProps<T>) => {
  const handleAddValue = () => {
    setValue([...value, { id: value.length + 1, content: "" } as T]);
  };

  const handleEditValue = (index: number, text: string) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], content: text };
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
