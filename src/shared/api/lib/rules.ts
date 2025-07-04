import { Method } from "@/shared/api/util/fetcher";

export const rules = {
  getStudyRules: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/rules`,
    method: Method.GET,
  }),
  postStudyRules: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/rules`,
    method: Method.POST,
  }),
};
