"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles
import { isStrictMode } from "../../next.config";
import { ImageResize } from "quill-image-resize-module-ts";

// Define the ref type for the QuillEditor component
export type QuillEditorHandle = {
  getContent: () => string;
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
      if (quillRef.current) {
        return quillRef.current.root.innerHTML; // Return the HTML content
      }
      return "";
    },
  }));

  return <div ref={editorRef} style={{ height: "300px" }} />;
});

QuillEditor.displayName = "QuillEditor";
export default QuillEditor;
