import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../../../components/molecules/Label";

interface LabelEditorProps {
  label: string;
  name: string;
  id?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

const LabelEditor = ({ label, name, required }: LabelEditorProps) => {
  const { register } = useFormContext();

  useEffect(() => {
    register(name, {
      required: required ? "스터디 설명은 필수 입력 사항입니다." : false,
    });
  }, [register, name, required]);

  return (
    <div className="flex w-full flex-col gap-[5px]">
      <Label label={label} required={required} />
      <div className="h-[500px] overflow-hidden rounded-md border border-mos-gray-100"></div>
    </div>
  );
};

export default LabelEditor;
