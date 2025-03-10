import React from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/atoms/Input";
import Label from "./Label";

interface LabelNumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  id?: string;
}

const LabelNumberInput = ({
  name,
  label,
  id,
  className,
  required,
  ...props
}: LabelNumberInputProps) => {
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)}>
      <Label label={label} required htmlFor={inputId} />

      <Input
        name={name}
        id={inputId}
        type="number"
        className="w-full placeholder:text-mos-gray-500"
        required={required}
        {...props}
      />
    </div>
  );
};

export default LabelNumberInput;
