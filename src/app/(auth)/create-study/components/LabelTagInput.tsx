import { useState } from "react";
import { useFormContext } from "react-hook-form";

import cn from "@/shared/utils/cn";

import Button from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";

interface LabelTagInputProps {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
}

const LabelTagInput = ({
  name,
  label,
  id,
  placeholder,
}: LabelTagInputProps) => {
  const { setValue, watch } = useFormContext();
  const tags: string[] = watch(name, []);
  const [tagInputState, setTagInputState] = useState("");
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;

  const handleClickAddButton = () => {
    if (tagInputState.trim() === "") return;

    setValue(name, [...tags, tagInputState.trim()]);
    setTagInputState("");
  };

  const handleRemoveTag = (index: number) => {
    setValue(
      name,
      tags.filter((_: string, i: number) => i !== index)
    );
  };

  return (
    <div className="flex w-full flex-col gap-[5px]">
      <label htmlFor={inputId} className="flex items-center">
        <Typography.P1 className="text-[15px]">{label}</Typography.P1>
      </label>

      <div className="flex">
        <Input
          id={inputId}
          value={tagInputState}
          onChange={(e) => setTagInputState(e.target.value)}
          className="w-full rounded-r-none placeholder:text-mos-gray-500"
          placeholder={placeholder}
        />
        <Button.Ghost
          type="button"
          active
          onClick={handleClickAddButton}
          color="Main"
          className="h-[47px] w-[50px] rounded-l-none"
        >
          추가
        </Button.Ghost>
      </div>

      <div
        className={cn(tags.length >= 1 && "mb-[-33px]", "flex flex-wrap gap-2")}
      >
        {tags.map((tag: string, index: number) => (
          <Tag.Detail
            key={index}
            className=" flex items-center gap-2 px-5  py-4"
          >
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
