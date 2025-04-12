import Input from "@/components/atoms/Input";
import cn from "@/utils/cn";
import React from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import ErrorMessage from "../atoms/ErrorMessage";
import Label from "./Label";

interface LabelInputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  id?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
}

const LabelInput = <T extends FieldValues>({
  label,
  name,
  id,
  className,
  required,
  registerOptions,
  ...props
}: LabelInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)}>
      <Label label={label} required={required} htmlFor={id} />
      <Input
        id={id}
        {...register(name, registerOptions)}
        className="w-full placeholder:text-mos-gray-500"
        {...props}
      />
      {errors[name]?.message && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
};

export default LabelInput;
