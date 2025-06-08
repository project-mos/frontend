import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";
import {
  CreateStudyRequest,
  CreateStudyResponse,
  UploadImageRequest,
} from "../types/create-study.api";

function sanitizeCodeLikeLinesWithEscape(md: string): string {
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
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function parseRequirements(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((content, index) => ({ requirementNum: index + 1, content }));
}

function filterEmptyByKey<T>(arr: T[], key: keyof T) {
  return arr.filter((item) => {
    const value = item[key];
    return typeof value === "string" && value.trim() !== "";
  });
}

export async function createStudy({ form }: CreateStudyRequest) {
  const { url, method } = API_ENDPOINT.study.createStudy();
  const parsedRequirements = parseRequirements(
    form.requirements as unknown as string
  );

  const filteredRules = filterEmptyByKey(form.rules, "content");
  const filteredBenefits = filterEmptyByKey(form.benefits, "content");
  const filteredQuestions = filterEmptyByKey(
    form.applicationQuestions,
    "question"
  );

  const filteredContent = sanitizeCodeLikeLinesWithEscape(form.content);

  return await fetchAPI<CreateStudyResponse>(url, {
    credentials: "include",
    body: JSON.stringify({
      title: form.title,
      category: form.category,
      maxStudyMemberCount: form.maxStudyMemberCount,
      recruitmentStartDate: form.recruitmentStartDate,
      recruitmentEndDate: form.recruitmentEndDate,
      tags: form.tags,
      meetingType: form.meetingType,
      schedule: form.schedule,
      content: filteredContent,
      curriculums: [],
      requirements: parsedRequirements,
      rules: filteredRules,
      benefits: filteredBenefits,
      applicationQuestions: filteredQuestions,
    }),
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function uploadImage({ file }: UploadImageRequest) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "STUDY");

  const { url, method } = API_ENDPOINT.study.uploadImage();

  const res = await fetchAPI(url, {
    credentials: "include",
    body: formData,
    method: method,
  });

  if (!res) {
    throw new Error("이미지 업로드 실패");
  }

  return res;
}
