import cn from "@/shared/utils/cn";
import { HTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import Select from "@/shared/components/atoms/Select";
import Typography from "@/shared/components/atoms/Typography";
import Label from "./Label";

interface LabelSelectInputProps<T extends FieldValues>
  extends HTMLAttributes<HTMLDivElement> {
  label: string;
  name: Path<T>;
  id?: string;
  required?: boolean;
  selectList: string[] | { label: string; value: string | number }[];
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
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)} {...props}>
      <Label label={label} required={required} htmlFor={id} />
      <Select
        id={id}
        {...register(name, registerOptions)}
        className={cn(
          "w-full placeholder:text-mos-gray-500 focus:border-mos-main-500 focus:outline-none"
        )}
      >
        {selectList.map((option, index) => {
          const isObject = typeof option === "object" && option !== null;
          const value = isObject ? option.value : option;
          const displayLabel = isObject ? option.label : option;

          return (
            <Select.Option key={index} value={value}>
              {displayLabel}
            </Select.Option>
          );
        })}
      </Select>
      {errors[name]?.message && (
        <Typography.Error>{String(errors[name]?.message)}</Typography.Error>
      )}
    </div>
  );
};

export default LabelSelectInput;
