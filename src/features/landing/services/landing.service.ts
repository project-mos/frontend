import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import {
  GetHotStudiesResult,
  GetStudiesRequest,
} from "@/shared/types/api/studies";
import { fetchData } from "@/shared/utils/fetcher";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// Study 다 건 조회
export async function getStudies({
  page = "1",
  size = "12",
  sort = "createAt,desc",
  category,
  meetType,
  recruitmentStatus,
  progressStatus,
  liked,
}: GetStudiesRequest) {
  const response = await fetchData<GetStudiesRequest>({
    endpoint: API_ENDPOINT.studies.getStudies({
      page,
      size,
      sort,
      category,
      meetType,
      recruitmentStatus,
      progressStatus,
      liked,
    }),
  });
  return response;
}

// useQuery 훅
export function useStudies(
  params: GetStudiesRequest,
  options?: Omit<
    UseQueryOptions<GetStudiesRequest, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<GetStudiesRequest, Error>({
    queryKey: [
      "studies",
      params.page ?? "1",
      params.size ?? "12",
      params.sort ?? "createAt,desc",
      params.category ?? null,
      params.meetType ?? null,
      params.recruitmentStatus ?? null,
      params.progressStatus ?? null,
      params.liked ?? null,
    ],
    queryFn: () => getStudies(params),
    ...options,
  });
}

export async function getHotStudies() {
  const response = await fetchData<GetHotStudiesResult>({
    endpoint: API_ENDPOINT.studies.getHotStudies(),
  });
  return response;
}

export function useHotStudies(
  options?: Omit<
    UseQueryOptions<GetHotStudiesResult, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<GetHotStudiesResult, Error>({
    queryKey: ["studies/hots"],
    queryFn: getHotStudies,
    ...options,
  });
}
