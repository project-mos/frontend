import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Editor from "@/shared/components/atoms/Editor";
import Typography from "@/shared/components/atoms/Typography";
import Label from "@/shared/components/molecules/Label";
import { uploadImage } from "@/entities/study/studies/api/studies.api";

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

  const handleUploadImage = async (file: File) => {
    const url = (await uploadImage({ file })) as { url: string };
    return url;
  };

  return (
    <div className="mb-[35px] gap-[5px]" id="scroll-container">
      <Label label={label} required={required} />
      <div className="h-[500px]">
        <Editor name={name} uploadImage={handleUploadImage} />
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
