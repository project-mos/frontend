export function sanitizeCodeLikeLinesWithEscape(md: string): string {
  const CODE_LIKE_KEYWORDS = [
    "const ",
    "let ",
    "function ",
    "import ",
    "export ",
    "return ",
    "class ",
    "if ",
    "else ",
    "for ",
    "while ",
    "{",
    "}",
    "=",
    "<", // JSX나 HTML 태그 시작
    "/>", // JSX 닫힘
  ];

  const lines = md.split("\n");
  const result: string[] = [];

  let insideCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // ``` 코드블럭 시작/종료
    if (trimmed.startsWith("```")) {
      result.push(line);
      insideCodeBlock = !insideCodeBlock;
      continue;
    }

    // 코드블럭 내부는 그대로
    if (insideCodeBlock) {
      result.push(line);
      continue;
    }

    // 코드처럼 생긴 줄 또는 JSX 형태 감지
    const isCodeLike = CODE_LIKE_KEYWORDS.some(
      (kw) => trimmed.startsWith(kw) || trimmed.includes(kw)
    );

    if (isCodeLike) {
      result.push(`<p>${escapeHtml(line)}</p>`);
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}

// HTML & JSX 이스케이프
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
export function parseRequirements(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((content, index) => ({ requirementNum: index + 1, content }));
}

export function filterEmptyByKey<T>(arr: T[], key: keyof T) {
  return arr.filter((item) => {
    const value = item[key];
    return typeof value === "string" && value.trim() !== "";
  });
}

export const convertToWebP = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context 불러오기 실패");

      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject("WebP 변환 실패");
        },
        "image/webp",
        0.8 // 품질: 0~1
      );
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
