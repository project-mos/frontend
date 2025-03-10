import React from "react";
import Label from "./Label";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";

const Editor = dynamic(() => import("@/components/atoms/MDXEditor"), {
  ssr: false,
});

interface LabelEditorProps {
  label: string;
  name: string;
  id?: string;
  required?: boolean;
}

const LabelEditor = ({ label, name, id, required }: LabelEditorProps) => {
  const { watch, setValue } = useFormContext();

  const content = watch(name) || "";

  const handleChange = (value: string) => {
    setValue(name, value);
  };

  return (
    <div className="flex w-full flex-col gap-[5px]">
      <Label htmlFor={id || name} label={label} required={required} />
      <div
        aria-labelledby="editor-label"
        className="rounded-md border border-mos-gray-100"
      >
        <Editor
          className="h-[500px]"
          placeholder="스터디의 목표, 진행 방식, 기대 효과 등을 자세히 설명해주세요."
          markdown={content}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default LabelEditor;
