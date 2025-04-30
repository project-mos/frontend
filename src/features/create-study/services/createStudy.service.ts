import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchData } from "@/shared/utils/fetcher";
import { StudyFormInterface } from "../form/CreateStudyForm";

interface createStudyProps {
  form: StudyFormInterface;
}

export default async function createStudy({ form }: createStudyProps) {
  console.log(form);
  return;
  const response = await fetchData({
    endpoint: API_ENDPOINT.study.createStudy(),
    data: {
      title: form.title,
      category: form.category,
      maxStudyMemberCount: form.maxStudyMemberCount,
      recruitmentStartDate: form.recruitmentStartDate,
      recruitmentEndDate: form.recruitmentEndDate,
      tags: form.tags,
      meetingType: form.meetingType,
      schedule: form.schedule,
      content: form.content,
      requirements: form.requirements,
      rules: form.rules,
      benefits: form.benefits,
      applicationQuestions: form.applicationQuestions,
    },
  });

  return response;
}
