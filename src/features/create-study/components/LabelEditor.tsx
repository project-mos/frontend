import ErrorMessage from "@/components/atoms/ErrorMessage";
import Label from "@/components/molecules/Label";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
});

type QuillEditorHandle = {
  getContent: () => string;
};

interface LabelEditorProps {
  label: string;
  name: string;
  editorRef: React.RefObject<QuillEditorHandle | null>;
  required?: boolean;
}

const LabelEditor = ({
  label,
  name,
  editorRef,
  required,
}: LabelEditorProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="gap-[5px]">
      <Label label={label} required={required} />
      <div className="h-[500px]">
        <QuillEditor ref={editorRef} />
      </div>
      {errors[name] && (
        <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
      )}
    </div>
  );
};

export default LabelEditor;
