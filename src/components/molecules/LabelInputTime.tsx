import React from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/atoms/Input";
import Label from "./Label";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import Typography from "@/components/atoms/Typography";

interface LabelInputTimeProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  id?: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
}

const LabelInputTime = <T extends FieldValues>({
  label,
  name,
  id,
  className,
  required,
  registerOptions,
  ...props
}: LabelInputTimeProps<T>) => {
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)}>
      <Label label={label} required={required} htmlFor={inputId} />
      <Input
        type="time"
        id={inputId}
        className="w-full placeholder:text-mos-gray-500"
        {...register(name, registerOptions)}
        {...props}
      />
      {errors[name]?.message && (
        <Typography.P1 className="text-red-600">
          {String(errors[name]?.message)}
        </Typography.P1>
      )}
    </div>
  );
};

export default LabelInputTime;
