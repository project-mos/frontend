import { StudyFormInterface } from "../types/create-study.type";

interface createStudyProps {
  form: StudyFormInterface;
  token: string;
}

function parseRequirements(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((content, index) => ({ requirementNum: index + 1, content }));
}

function filterEmptyContent<T extends { content: string }>(arr: T[]) {
  return arr.filter((item) => item.content.trim() !== "");
}

function filterEmptyQuestion<T extends { question: string }>(arr: T[]) {
  return arr.filter((item) => item.question.trim() !== "");
}

export default async function createStudy({ form, token }: createStudyProps) {
  const parsedRequirements = parseRequirements(
    form.requirements as unknown as string
  );

  const filteredRules = filterEmptyContent(form.rules);
  const filteredBenefits = filterEmptyContent(form.benefits);
  const filteredQuestions = filterEmptyQuestion(form.applicationQuestions);

  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/studies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    });

    const res = await result.json();

    return res;
  } catch (err) {
    console.error("네트워크 오류 또는 서버 장애:", err);
    throw err;
  }
}
