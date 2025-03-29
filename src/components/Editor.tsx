"use client";

import MDEditor, { commands } from "@uiw/react-md-editor";
import { useFormContext } from "react-hook-form";

interface EditorProps {
  name: string;
}

const Editor = ({ name }: EditorProps) => {
  const { setValue, watch, clearErrors } = useFormContext();
  const contents = watch(name);

  const handleChange = (value?: string) => {
    if (value !== undefined) {
      setValue(name, value, { shouldValidate: true });
      clearErrors("content");
    }
  };

  //   const imageHandler = (
  //     api: TextAreaTextApi,
  //     value?: string,
  //     onChange?: (val: string) => void
  //   ) => {
  //     const input = document.createElement("input");
  //     input.setAttribute("type", "file");
  //     input.setAttribute("accept", "image/*");
  //     input.click();

  //     input.addEventListener("change", async () => {
  //       const file = input.files?.[0];
  //       if (!file) return;

  //       const storageRef = ref(storage, `image/${Date.now()}`);
  //       try {
  //         const snapshot = await uploadBytes(storageRef, file);
  //         const url = await getDownloadURL(snapshot.ref);
  //         const insert = `![image](${url})`;

  //         api.replaceSelection(insert);

  //         if (onChange) {
  //           const updated = `${value || ""}\n${insert}`;
  //           onChange(updated);
  //         }
  //       } catch (error) {
  //         alert(`${error} 이미지 업로드 실패`);
  //       }
  //     });
  //   };

  //   const customImageCommand = {
  //     name: "image",
  //     keyCommand: "image",
  //     buttonProps: { "aria-label": "Insert image" },
  //     icon: <i className="bi bi-image" />,
  //     execute: (state: TextState, api: TextAreaTextApi) => {
  //       imageHandler(api);
  //     },
  //   };

  return (
    <MDEditor
      className="mt-[20px]"
      value={contents}
      onChange={handleChange}
      height={530}
      //   commands={[...commands.getCommands(), customImageCommand]}
      commands={[...commands.getCommands()]}
    />
  );
};

export default Editor;
