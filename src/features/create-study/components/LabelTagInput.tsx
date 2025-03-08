import React from "react";
import Input from "@/components/atoms/Input";
import Tag from "@/components/atoms/Tag";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { useFormContext } from "react-hook-form";

interface LabelTagInputProps {
  name: string;
  tagList: string[];
  setTagList: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  id?: string;
}

const LabelTagInput = ({
  name,
  tagList,
  setTagList,
  label,
  id,
}: LabelTagInputProps) => {
  const { register, setValue, watch } = useFormContext();
  const tagElement = watch(name, ""); // useFormContext에서 watch를 사용하여 값 관리

  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;

  const handleClickAddButton = () => {
    if (tagElement.trim() === "") return;
    setTagList((prevTags) => [...prevTags, tagElement.trim()]);
    setValue(name, ""); // 입력 필드 초기화
  };

  const handleRemoveTag = (index: number) => {
    setTagList((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-full flex-col gap-[10px]">
      <label htmlFor={inputId} className="flex items-center">
        <Typography.P1>{label}</Typography.P1>
      </label>

      <div className="flex">
        <Input
          id={inputId}
          className="w-full rounded-r-none placeholder:text-mos-gray-500"
          {...register(name)}
        />
        <Button.Solid
          type="button"
          onClick={handleClickAddButton}
          color="Main"
          className="h-[42px] w-[50px] rounded-l-none"
        >
          추가
        </Button.Solid>
      </div>

      <div className="flex flex-wrap gap-2">
        {tagList.map((tag, index) => (
          <Tag.Detail key={index} className="flex items-center gap-2 px-5 py-4">
            <Typography.P1>{tag}</Typography.P1>
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="text-sm"
            >
              ✕
            </button>
          </Tag.Detail>
        ))}
      </div>
    </div>
  );
};

export default LabelTagInput;
