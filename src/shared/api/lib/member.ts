import { Method } from "@/shared/api/util/fetcher";

export const members = {
  getMembers: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/members`,
    method: Method.GET,
  }),
  // (구 네이밍 leave-study)
  deleteMember: (studyId: string) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/members`,
      method: Method.DELETE,
    };
  },
};
