import { GetStudiesRequest } from "@/features/landing/types/landing.api";
import { Method } from "@/shared/api/util/fetcher";

export const study = {
  createStudy: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies`,
    method: Method.POST,
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
};
