import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../../../components/molecules/Label";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/atoms/MDXEditor"), {
  ssr: false,
});

interface LabelEditorProps {
  label: string;
  name: string;
  id?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

const LabelEditor = ({ label, name, required }: LabelEditorProps) => {
  const { watch, setValue, register } = useFormContext();

  const content = watch(name) || "";

  useEffect(() => {
    register(name, {
      required: required ? "스터디 설명은 필수 입력 사항입니다." : false,
    });
  }, [register, name, required]);

  return (
    <div className="flex w-full flex-col gap-[5px]">
      <Label label={label} required={required} />
      <div className="h-[500px] overflow-hidden rounded-md border border-mos-gray-100">
        <Editor
          className="size-full"
          placeholder="스터디의 목표, 진행 방식, 기대 효과 등을 자세히 설명해주세요."
          markdown={content}
          onChange={(value) => setValue(name, value, { shouldValidate: true })}
        />
      </div>
    </div>
  );
};

export default LabelEditor;
