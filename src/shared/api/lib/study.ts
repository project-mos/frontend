import { GetStudiesRequest } from "@/entities/study/studies/api/studies.api.type";
import { Method } from "@/shared/api/util/fetcher";

export const study = {
  createStudy: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies`,
    method: Method.POST,
  }),
  patchStudy: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}`,
    method: Method.PATCH,
  }),
  getStudy: (id: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${id}`,
    method: Method.GET,
  }),
  getStudies: ({
    page = "1",
    size = "12",
    sort = "createdAt,desc",
    category,
    meetType,
    recruitmentStatus,
    progressStatus,
    liked,
  }: GetStudiesRequest) => {
    const params = new URLSearchParams({ page, size, sort });
    if (category) params.append("category", category);
    if (meetType) params.append("meetingType", meetType);
    if (recruitmentStatus)
      params.append("recruitmentStatus", recruitmentStatus);
    if (progressStatus) params.append("progressStatus", progressStatus);
    if (liked !== undefined) params.append("liked", liked.toString());

    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies?${params.toString()}`,
      method: Method.GET,
    };
  },
  getHotStudies: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/hots`,
    method: Method.GET,
  }),
  uploadImage: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/recruitment-images`,
    method: Method.POST,
  }),
  deleteStudy: (studyId: string) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}`,
      method: Method.DELETE,
    };
  },
  getLikeStudy: (studyIds: number[]) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/likes?studyIds=${studyIds}`,
    method: Method.GET,
  }),
  likeStudy: (studyId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/likes`,
    method: Method.POST,
  }),
  unlikeStudy: (studyId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/likes`,
    method: Method.DELETE,
  }),
  getUserStudySettings: (studyId: number) =>  ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/settings`,
    method: Method.GET,
  }),
  putUserStudyNoticeSettings: (studyId: number) =>  ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/settings`,
    method: Method.PUT,
  }),
  getBanners: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/banners`,
    method: Method.GET,
  }),
};
