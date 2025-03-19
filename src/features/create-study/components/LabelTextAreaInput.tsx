import React from "react";
import { cn } from "@/lib/utils";
import Label from "../../../components/molecules/Label";
import Textarea from "@/components/atoms/Textarea";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import Typography from "@/components/atoms/Typography";

interface LabelTextAreaInputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
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
    <div className={cn("flex w-full flex-col gap-[5px]", className)} {...props}>
      <Label label={label} required={required} />
      <Textarea
        className="h-[130px] resize-none"
        placeholder={placeholder}
        required={false}
        {...register(name, registerOptions)}
      />
      {errors[name]?.message && (
        <Typography.P1 className="text-red-600">
          {String(errors[name]?.message)}
        </Typography.P1>
      )}
    </div>
  );
};

export default LabelTextAreaInput;
