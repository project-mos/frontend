import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import MDEditor, {
  commands,
  TextAreaTextApi,
  TextState,
} from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { uploadImage } from "@/entities/study/studies/api/studies.api";

interface EditorProps {
  name: string;
  uploadImage: (file: File) => Promise<{ url: string }>;
}

const Editor = ({ name, uploadImage }: EditorProps) => {
  const { watch, setValue } = useFormContext();
  const value = watch(name);
  const editorRef = useRef<HTMLDivElement>(null);

  // 이미지 업로드 후 마크다운 삽입
  const uploadImageAndInsert = async (file: File) => {
    try {
      const url = await uploadImage(file);
      const insert = `![image](${url})`;
      const newValue = (value ?? "") + "\n" + insert;
      setValue(name, newValue);
    } catch (e) {
      console.error(e);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  // 이미지 버튼 클릭
  const imageHandler = (
    api: TextAreaTextApi,
    currentValue?: string,
    onChange?: (val: string) => void
  ) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const url = await uploadImage(file);
        const insert = `![image](${url})`;

        api.replaceSelection(insert);

        if (onChange) {
          const newValue = (currentValue ?? "") + "\n" + insert;
          onChange(newValue);
        }
      } catch (e) {
        console.error(e);
        alert("이미지 업로드에 실패했습니다.");
      }
    });
  };

  // 기본 커맨드 중 "image" 제거
  const defaultCommands = commands
    .getCommands()
    .filter((cmd) => cmd.name !== "image");

  // 이미지 버튼 커맨드 정의
  const customImageCommand = {
    name: "image",
    keyCommand: "image",
    buttonProps: { "aria-label": "Insert image" },
    icon: <i className="bi bi-image" />,
    execute: (state: TextState, api: TextAreaTextApi) => {
      imageHandler(api, value, (val) => setValue(name, val));
    },
  };

  // 드래그앤드랍 이벤트 등록
  useEffect(() => {
    const wrapper = editorRef.current;
    if (!wrapper) return;

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "move";

      const file = e.dataTransfer?.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      await uploadImageAndInsert(file);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "copy";
    };

    wrapper.addEventListener("drop", handleDrop);
    wrapper.addEventListener("dragover", handleDragOver);

    return () => {
      wrapper.removeEventListener("drop", handleDrop);
      wrapper.removeEventListener("dragover", handleDragOver);
    };
  }, [value, name]);

  return (
    <div ref={editorRef}>
      <MDEditor
        className="mt-[20px]"
        value={value}
        onChange={(val) => setValue(name, val ?? "")}
        height={530}
        style={{
          height: 530,
          minHeight: 530,
          maxHeight: 530,
          overflow: "auto",
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        commands={[...defaultCommands, customImageCommand]}
      />
    </div>
  );
};

export default Editor;
