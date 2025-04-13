import Typography from "@/components/atoms/Typography";
import Editor from "@/components/Editor";
import Label from "@/components/molecules/Label";

// import dynamic from "next/dynamic";
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

  return (
    <div className="mb-[35px] gap-[5px]">
      <Label label={label} required={required} />
      <div className="h-[500px]">
        <Editor name={name} />
      </div>
      {errors[name] && (
        <div className="mt-[40px]">
          <Typography.Error>{errors[name]?.message as string}</Typography.Error>
        </div>
      )}
    </div>
  );
};

export default LabelEditor;
