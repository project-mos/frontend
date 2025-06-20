import { Method } from "@/shared/api/util/fetcher";

export const rules = {
  getStudyRules: (studyId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/rules`,
    method: Method.GET,
    queryKey: ["studies", "rules", studyId],
  }),
  editStudyRules: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/rules`,
    method: Method.POST,
    queryKey: ["studies", "rules", studyId],
  }),
};
