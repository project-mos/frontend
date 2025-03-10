import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import Select from "@/components/atoms/Select";
import Label from "./Label";

interface LabelSelectInputProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  name: string;
  id?: string;
  required?: boolean;
  selectList: string[];
}

const LabelSelectInput = ({
  label,
  id,
  name,
  className,
  required,
  selectList,
  ...props
}: LabelSelectInputProps) => {
  const { register, setValue } = useFormContext();
  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)} {...props}>
      <Label label={label} required={required} htmlFor={id} />
      <Select
        id={id}
        {...register(name)}
        onChange={(e) => setValue(name, (e.target as HTMLSelectElement).value)}
        className={cn(
          "w-full placeholder:text-mos-gray-500 focus:border-mos-main-500 focus:outline-none"
        )}
      >
        {selectList.map((option, index) => (
          <Select.Option key={index} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default LabelSelectInput;
