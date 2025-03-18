import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Tag from "@/components/atoms/Tag";
import Typography from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

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
  const [tagInput, setTagInput] = useState("");
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;

  const handleClickAddButton = () => {
    if (tagInput.trim() === "") return;

    setValue(name, [...tags, tagInput.trim()]);
    setTagInput("");
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
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="w-full rounded-r-none placeholder:text-mos-gray-500"
          placeholder={placeholder}
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
