import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import Select from "@/components/atoms/Select";
import Label from "../../../components/molecules/Label";
import ErrorMessage from "@/components/atoms/ErrorMessage";
interface LabelSelectInputProps<T extends FieldValues>
  extends HTMLAttributes<HTMLDivElement> {
  label: string;
  name: Path<T>;
  id?: string;
  required?: boolean;
  selectList: string[];
  registerOptions?: RegisterOptions<T, Path<T>>;
}

const LabelSelectInput = <T extends FieldValues>({
  label,
  id,
  name,
  className,
  required,
  selectList,
  registerOptions,
  ...props
}: LabelSelectInputProps<T>) => {
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;

  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)} {...props}>
      <Label label={label} required={required} htmlFor={id} />
      <Select
        id={inputId}
        {...register(name, registerOptions)}
        // onChange={(e) => setValue(name, (e.target as HTMLSelectElement).value)}
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
      {errors[name]?.message && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
};

export default LabelSelectInput;
