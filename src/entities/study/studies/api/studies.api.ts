import {
  GetHotStudiesResponse,
  GetStudiesRequest,
  GetStudiesResponse,
  GetStudyResponse,
  PatchStudyRequest,
  PostStudyRequest,
  PostStudyResponse,
  UploadImageRequest,
} from "@/entities/study/studies/api/studies.api.type";
import {
  convertToWebP,
  filterEmptyByKey,
  parseRequirements,
  sanitizeCodeLikeLinesWithEscape,
} from "@/entities/study/studies/lib";
import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";

export async function getStudies({
  page,
  size,
  sort,
  category,
  meetType,
  recruitmentStatus,
  progressStatus,
  liked,
}: GetStudiesRequest) {
  const response = await fetchAPI<GetStudiesResponse>(
    API_ENDPOINT.study.getStudies({
      page,
      size,
      sort,
      category,
      meetType,
      recruitmentStatus,
      progressStatus,
      liked,
    }).url
  );
  return response;
}

//인기 Study 조회
export async function getHotStudies() {
  const response = await fetchAPI<GetHotStudiesResponse>(
    API_ENDPOINT.study.getHotStudies().url
  );
  return response;
}
export async function getStudy(id: string) {
  const response = await fetchAPI<GetStudyResponse>(
    API_ENDPOINT.study.getStudy(id).url
  );
  return response;
}

export async function postStudy({ form }: PostStudyRequest) {
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

  return await fetchAPI<PostStudyResponse>(url, {
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

export async function patchStudy({ form, studyId }: PatchStudyRequest) {
  const { url, method } = API_ENDPOINT.study.patchStudy(studyId);
  const parsedRequirements = parseRequirements(
    form.requirements as unknown as string
  );

  const filteredContent = sanitizeCodeLikeLinesWithEscape(form.content);

  return await fetchAPI<PostStudyResponse>(url, {
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
      requirements: parsedRequirements,
    }),
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function uploadImage({ file }: UploadImageRequest) {
  const convertedImage = await convertToWebP(file);
  const formData = new FormData();
  formData.append("file", convertedImage);
  formData.append("type", "TEMP");

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
