import ErrorMessage from "@/components/atoms/ErrorMessage";
import Editor from "@/components/Editor";
import Label from "@/components/molecules/Label";
import { QuillEditorHandle } from "@/components/QuillEditor";
// import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";

// const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
//   ssr: false,
// });

interface LabelEditorProps {
  label: string;
  name: string;
  editorRef: React.RefObject<QuillEditorHandle | null>;
  required?: boolean;
}

const LabelEditor = ({
  label,
  name,
  // editorRef,
  required,
}: LabelEditorProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-[35px] gap-[5px]">
      <Label label={label} required={required} />
      <div className="h-[500px]">
        {/* <QuillEditor ref={editorRef} /> */}
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
