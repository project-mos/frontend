"use client";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
});

// Define the QuillEditorHandle type
type QuillEditorHandle = {
  getContent: () => string;
};

export default function Home() {
  const editorRef = useRef<QuillEditorHandle>(null); // Ref for QuillEditor
  const [editorContent, setEditorContent] = useState<string>(""); // State to store the editor content

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent(); // Get the editor content
      setEditorContent(content); // Update the state with the content
    }
  };

  return (
    <div className="p-4">
      <h1 className="my-5 text-center text-xl font-bold">Rich Text Editor</h1>
      <div>
        <QuillEditor ref={editorRef} />
      </div>
      <button
        onClick={handleGetContent}
        className="mt-4 flex rounded bg-blue-500 px-4 py-2 text-white "
      >
        Show Content
      </button>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Editor Content:</h2>
        <div
          className="rounded border bg-gray-50 p-4"
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      </div>
    </div>
  );
}
