import { Method } from "@/shared/api/util/fetcher";

export const questions = {
  getQuestions: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/questions`,
    method: Method.GET,
  }),
};
