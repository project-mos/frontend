import React from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/atoms/Input";
import Label from "@/components/molecules/Label";
import {
  useFormContext,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

import ErrorMessage from "@/components/atoms/ErrorMessage";

interface LabelInputDateProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  id?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
}

const LabelInputDate = <T extends FieldValues>({
  label,
  name,
  id,
  className,
  required,
  registerOptions,
  ...props
}: LabelInputDateProps<T>) => {
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className={cn("mb-2 flex w-full flex-col gap-[5px]", className)}>
      <Label label={label} required={required} htmlFor={inputId} />
      <Input
        type="date"
        id={inputId}
        className="w-full placeholder:text-mos-gray-500"
        {...register(name, registerOptions)}
        {...props}
      />
      {/* <Typography.P1 className="text-red-600">asdasd</Typography.P1> */}
      {errors[name]?.message && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
};

export default LabelInputDate;
