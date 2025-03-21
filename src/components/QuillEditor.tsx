"use client";

import Quill from "quill";
import { ImageResize } from "quill-image-resize-module-ts";
import "quill/dist/quill.snow.css"; // Import Quill styles
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { isStrictMode } from "../../next.config";

// Define the ref type for the QuillEditor component
export type QuillEditorHandle = {
  getContent: () => string;
  setContent: (content: string) => void;
};

Quill.register("modules/ImageResize", ImageResize);

const QuillEditor = forwardRef<QuillEditorHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    // strict 모드 확인 후 ql-toolbar 제거
    if (isStrictMode) {
      const elements = document.getElementsByClassName("ql-toolbar");
      if (elements?.length > 0) {
        elements[0].remove();
      }
    }

    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
          ImageResize: {
            modules: ["Resize", "DisplaySize"],
          },
        },
        placeholder: "Write something...",
      });
    }

    return () => {
      quillRef.current = null; // Cleanup to avoid memory leaks
    };
  }, []);

  // Expose the getContent function to the parent component
  useImperativeHandle(ref, () => ({
    getContent: () => {
      return quillRef.current ? quillRef.current.root.innerHTML : "";
    },
    setContent: (content: string) => {
      if (quillRef.current) {
        quillRef.current.root.innerHTML = content;
      }
    },
  }));

  return <div ref={editorRef} />;
});

QuillEditor.displayName = "QuillEditor";
export default QuillEditor;
