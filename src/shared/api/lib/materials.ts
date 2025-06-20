import { Method } from "@/shared/api/util/fetcher";

export const materials = {
  upload: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/materials`,
    method: Method.POST,
  }),
  getMaterials: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/materials`,
    method: Method.GET,
  }),
  getMaterial: (studyId: string, materialId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/materials/${materialId}`,
    method: Method.GET,
  }),
};
