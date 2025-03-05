import React from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/atoms/Input";
import Typography from "@/components/atoms/Typography";

interface LabelDateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
}

const LabelDateInput = ({
  label,
  id,
  className,
  required,
  ...props
}: LabelDateInputProps) => {
  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)}>
      <label htmlFor={id}>
        <Typography.P1>
          {label} {required ? "*" : ""}
        </Typography.P1>
      </label>

      <Input
        type="date"
        placeholder="ss"
        id={id}
        className="w-full placeholder:text-mos-gray-500"
        required={required}
        {...props}
      />
    </div>
  );
};

export default LabelDateInput;
