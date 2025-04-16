import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import MDEditor, {
  commands,
  TextAreaTextApi,
  TextState,
} from "@uiw/react-md-editor";

import { uploadImage } from "@/features/create-study/services/uploadImage.service";

interface EditorProps {
  name: string;
}

const Editor = ({ name }: EditorProps) => {
  const { control } = useFormContext();
  const editorRef = useRef<HTMLDivElement>(null);

  const imageHandler = (
    api: TextAreaTextApi,
    value?: string,
    onChange?: (val: string) => void
  ) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const url = await uploadImage(file);
        const insert = `![image](${url})`;

        api.replaceSelection(insert);

        if (onChange) {
          const newValue = (value ?? "") + "\n" + insert;
          onChange(newValue);
        }
      } catch (error) {
        alert(error);
      }
    });
  };

  const customImageCommand = {
    name: "image",
    keyCommand: "image",
    buttonProps: { "aria-label": "Insert image" },
    icon: <i className="bi bi-image" />,
    execute: (state: TextState, api: TextAreaTextApi) => {
      imageHandler(api, state.text, api.replaceSelection);
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "스터디 설명은 필수 입력사항입니다." }}
      render={({ field }) => (
        <div ref={editorRef}>
          <MDEditor
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
            }}
            height={530}
            commands={[...commands.getCommands(), customImageCommand]}
          />
        </div>
      )}
    />
  );
};

export default Editor;
