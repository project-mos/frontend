import React from "react";
import { cn } from "@/lib/utils";
import Label from "../../../components/molecules/Label";
import Textarea from "@/components/atoms/Textarea";

interface LabelTextAreaInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id?: string;
}
const LabelTextAreaInput = ({
  label,
  name,
  id,
  className,
  required,
  ...props
}: LabelTextAreaInputProps) => {
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)} {...props}>
      <Label htmlFor={inputId} label={label} required={required} />
      <Textarea
        name={name}
        className="h-[130px] resize-none"
        placeholder="스터디 참여에 필요한 조건을 작성해주세요. (예: 필요한 기초 지식, 준비물, 참여 가능 시간 등)"
      />
    </div>
  );
};

export default LabelTextAreaInput;
