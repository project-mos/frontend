import { Method } from "@/shared/api/util/fetcher";

export const benefits = {
  getStudyBenefits: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/benefits`,
    method: Method.GET,
  }),
  editStudyBenefits: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/benefits`,
    method: Method.POST,
  }),
};
