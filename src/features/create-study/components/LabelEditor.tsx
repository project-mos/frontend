import Editor from "@/components/Editor";
import Label from "@/components/molecules/Label";

interface LabelEditorProps {
  label: string;
  name: string;
  required?: boolean;
}

const LabelEditor = ({ label, name, required }: LabelEditorProps) => {
  return (
    <div className="mb-[35px] gap-[5px]">
      <Label label={label} required={required} />
      <div className="h-[500px]">
        <Editor name={name} />
      </div>
      {/* {errors[name] && (
        <div className="mt-[40px]">
          <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
        </div>
      )} */}
    </div>
  );
};

export default LabelEditor;
