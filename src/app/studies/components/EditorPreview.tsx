"use client";
import MDEditor from "@uiw/react-md-editor";
import "highlight.js/styles/atom-one-dark.css";

// export function sanitizeCodeLikeLinesWithParagraph(md: string): string {
//   const CODE_LIKE_KEYWORDS = [
//     "const ",
//     "let ",
//     "function ",
//     "import ",
//     "export ",
//     "return ",
//     "class ",
//     "if ",
//     "else ",
//     "for ",
//     "while ",
//     "{",
//     "}",
//     "=",
//   ];

//   const lines = md.split("\n");
//   const result: string[] = [];

//   let insideCodeBlock = false;

//   for (let line of lines) {
//     const trimmed = line.trim();

//     // 마크다운 코드 블럭 시작/종료
//     if (trimmed.startsWith("```")) {
//       result.push(line);
//       insideCodeBlock = !insideCodeBlock;
//       continue;
//     }

//     // 코드블럭 내부는 그대로
//     if (insideCodeBlock) {
//       result.push(line);
//       continue;
//     }

//     // 코드처럼 보이는 줄 감지
//     const isCodeLike = CODE_LIKE_KEYWORDS.some(
//       (kw) => trimmed.startsWith(kw) || trimmed.includes(kw)
//     );

//     if (isCodeLike) {
//       result.push(`<p>${escapeHtml(line)}</p>`);
//     } else {
//       result.push(line);
//     }
//   }

//   return result.join("\n");
// }

// // HTML 특수문자 이스케이프
// function escapeHtml(str: string): string {
//   return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// }

const EditorPreview = ({ content }: { content: string }) => {
  //   const filteredContent = sanitizeCodeLikeLinesWithParagraph(content);
  return (
    <div>
      <MDEditor.Markdown source={content} />
    </div>
  );
};

export default EditorPreview;
