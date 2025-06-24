import { Method } from "@/shared/api/util/fetcher";

export const requirement = {
  getRequirement: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/requirements`,
    method: Method.GET,
  }),
  getRequirements: (studyId: string, requirementId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/requirements/${requirementId}`,
    method: Method.GET,
  }),
};
