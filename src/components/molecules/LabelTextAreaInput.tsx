import React from "react";
import { cn } from "@/lib/utils";
import Label from "./Label";
import Textarea from "@/components/atoms/Textarea";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import ErrorMessage from "../atoms/ErrorMessage";

interface LabelTextAreaInputProps<T extends FieldValues>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: Path<T>;
  id?: string;
  placeholder: string;
  registerOptions?: RegisterOptions<T, Path<T>>;
}

const LabelTextAreaInput = <T extends FieldValues>({
  label,
  name,
  className,
  required,
  placeholder,
  registerOptions,
  ...props
}: LabelTextAreaInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)}>
      <Label label={label} required={required} />
      <Textarea
        className="h-[130px] resize-none"
        placeholder={placeholder}
        required={false}
        {...register(name, registerOptions)}
        {...props}
      />
      {errors[name]?.message && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
};

export default LabelTextAreaInput;
