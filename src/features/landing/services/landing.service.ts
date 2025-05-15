import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import {
  GetHotStudiesResult,
  GetStudiesRequest,
  GetStudiesResult,
} from "@/shared/types/api/studies";
import { fetchData } from "@/shared/utils/fetcher";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// Study 다 건 조회
export async function getStudies({
  page,
  size,
  sort,
  category,
  meetType,
  recruitmentStatus,
  progressStatus,
  liked,
}: GetStudiesRequest) {
  const response = await fetchData<GetStudiesResult>({
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
//인기 Study 조회
export async function getHotStudies() {
  const response = await fetchData<GetHotStudiesResult>({
    endpoint: API_ENDPOINT.studies.getHotStudies(),
  });
  return response;
}

// useStudies 훅
export function useStudies(
  params: GetStudiesRequest,
  options?: StudiesQueryOptions
) {
  return useQuery<GetStudiesResult, Error>(
    createStudiesQueryOptions(params, options)
  );
}

// useHotStudies 훅
export function useHotStudies(
  options?: Omit<
    UseQueryOptions<GetHotStudiesResult, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<GetHotStudiesResult, Error>(
    createHotStudiesQueryOption(options)
  );
}
// 공통 queryKey 생성 함수
function getStudiesQueryKey(params: GetStudiesRequest) {
  return [
    "studies",
    params.page ?? "1",
    params.size ?? "12",
    params.sort ?? "createAt,desc",
    params.category ?? null,
    params.meetType ?? null,
    params.recruitmentStatus ?? null,
    params.progressStatus ?? null,
    params.liked ?? null,
  ];
}

// 공통 옵션 타입
type StudiesQueryOptions = Omit<
  UseQueryOptions<GetStudiesResult, Error>,
  "queryKey" | "queryFn"
>;

// 공통 쿼리 옵션 생성 함수
export function createStudiesQueryOptions(
  params: GetStudiesRequest,
  options?: StudiesQueryOptions
) {
  return {
    queryKey: getStudiesQueryKey(params),
    queryFn: () => getStudies(params),
    ...options,
  };
}

export const createHotStudiesQueryOption = (
  options?: Omit<
    UseQueryOptions<GetHotStudiesResult, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return {
    queryKey: ["studies/hot"],
    queryFn: getHotStudies,
    ...options,
  };
};
