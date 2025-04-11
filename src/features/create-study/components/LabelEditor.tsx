import ErrorMessage from "@/components/atoms/ErrorMessage";
import Editor from "@/components/Editor";
import Label from "@/components/molecules/Label";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface LabelEditorProps {
  label: string;
  name: string;
  required?: boolean;
}

const LabelEditor = ({ label, name, required }: LabelEditorProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (errors[name]) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [errors[name]]);

  return (
    <div className="mb-[35px] gap-[5px]" id="scroll-container">
      <Label label={label} required={required} />
      <div className="h-[500px]">
        <Editor name={name} />
      </div>
      {errors[name] && (
        <div className="mt-[40px]">
          <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
        </div>
      )}
    </div>
  );
};

export default LabelEditor;
