import { JoinsRequest } from "@/entities/study/join/api/join.api.types";
import { Method } from "@/shared/api/util/fetcher";

export const join = {
  getJoins: (studyJoinStatus?: JoinsRequest) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/study-joins?studyJoinStatus=${studyJoinStatus}`,
      method: Method.GET,
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
  getStudyApplicant: (studyId: string, status: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-joins?studyJoinStatus=${status}`,
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
