import { GetStudyJoinsRequest } from "@/features/studies/types/studies.api";
import { Method } from "@/shared/api/util/fetcher";

export const join = {
  getJoins: (studyJoinStatus?: GetStudyJoinsRequest) => {
    const status = studyJoinStatus || "";
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/study-joins?studyJoinStatus=${status}`,
      method: Method.POST,
    };
  },
  postJoin: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-joins`,
    method: Method.POST,
  }),
  patchJoin: (studyId: string, studyJoinId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-joins/${studyJoinId}`,
    method: Method.PATCH,
  }),
  getMyJoinedStudies: (userId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/studies`,
    method: Method.GET,
  }),
  getMyApplyStatus: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/study-joins`,
    method: Method.GET,
  }),
  getStudyApplicant: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-joins`,
    method: Method.GET,
  }),
  approveApplicant: (studyId: string, studyJoinId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-joins/${studyJoinId}/approval`,
    method: Method.PATCH,
  }),
  rejectApplicant: (studyId: string, studyJoinId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-joins/${studyJoinId}/rejection`,
    method: Method.PATCH,
  }),
};
