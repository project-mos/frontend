import Select from "@/components/atoms/Select";
import cn from "@/utils/cn";
import { HTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import Label from "./Label";
import Typography from "@/components/atoms/Typography";

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
        {selectList.map((option, index) => (
          <Select.Option key={index} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      {errors[name]?.message && (
        <Typography.Error>{String(errors[name]?.message)}</Typography.Error>
      )}
    </div>
  );
};

export default LabelSelectInput;
