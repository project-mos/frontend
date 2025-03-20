import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/atoms/Input";
import Label from "../../../components/molecules/Label";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import ErrorMessage from "@/components/atoms/ErrorMessage";

interface LabelNumberInputProps<T extends FieldValues>
  extends HTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  id?: string;
  required?: boolean;
  placeholder: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
}

const LabelNumberInput = <T extends FieldValues>({
  name,
  label,
  id,
  className,
  required,
  registerOptions,
  placeholder,
  ...props
}: LabelNumberInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)}>
      <Label label={label} required={required} htmlFor={inputId} />
      <Input
        id={inputId}
        type="number"
        className="w-full placeholder:text-mos-gray-500"
        required={required}
        placeholder={placeholder}
        {...register(name, registerOptions)}
        {...props}
        min={1}
      />
      {errors[name]?.message && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
};

export default LabelNumberInput;
