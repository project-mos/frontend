import React from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/atoms/Input";
import Label from "../../../components/molecules/Label";

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
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)}>
      <Label label={label} required htmlFor={inputId} />
      <Input
        type="date"
        name={name}
        id={inputId}
        className="w-full placeholder:text-mos-gray-500"
        required={required}
        {...props}
      />
    </div>
  );
};

export default LabelDateInput;
