import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";
import {
  CreateStudyRequest,
  CreateStudyResponse,
} from "../types/create-study.api";

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
      content: form.content,
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
