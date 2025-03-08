import React from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/atoms/Input";
import Typography from "@/components/atoms/Typography";
import { useFormContext } from "react-hook-form";

interface LabelDateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id?: string;
}

const LabelDateInput = ({
  label,
  name,
  id,
  className,
  required,
  ...props
}: LabelDateInputProps) => {
  const { register } = useFormContext();
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)}>
      <label htmlFor={inputId}>
        <Typography.P1>
          {label} {required ? "*" : ""}
        </Typography.P1>
      </label>

      <Input
        type="date"
        id={inputId}
        className="w-full placeholder:text-mos-gray-500"
        required={required}
        {...register(name)}
        {...props}
      />
    </div>
  );
};

export default LabelDateInput;
