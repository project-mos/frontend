import { Method } from "@/shared/api/util/fetcher";

export const curriculums = {
  getCurriculums: (studyId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/curriculums`,
    method: Method.GET,
  }),
  postCurriculums: (studyId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/curriculums`,
    method: Method.POST,
  }),
};
