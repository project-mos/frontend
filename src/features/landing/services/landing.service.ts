import {
  GetStudiesRequest,
  GetStudiesResponse,
  GetHotStudiesResponse,
  GetAccessTokenResponse,
} from "@/features/landing/types/landing.api";

import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { GetStudyCategoriesResponse } from "@/shared/types/api/studies";

import { fetchAPI } from "@/shared/utils/fetch";

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
  const response = await fetchAPI<GetStudiesResponse>(
    API_ENDPOINT.studies.getStudies({
      page,
      size,
      sort,
      category,
      meetType,
      recruitmentStatus,
      progressStatus,
      liked,
    }).url
  );
  return response;
}
//인기 Study 조회
export async function getHotStudies() {
  const response = await fetchAPI<GetHotStudiesResponse>(
    API_ENDPOINT.studies.getHotStudies().url
  );
  return response;
}
//Study 카테고리 조회(ISR)
export async function getCategories() {
  const response = await fetchAPI<GetStudyCategoriesResponse>(
    API_ENDPOINT.studies.getCategories().url,
    {
      credentials: "include",
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  );
  return response;
}

// Refresh 토큰 기반 Access 토큰 재발급
export async function getRefreshAuth() {
  await fetchAPI(API_ENDPOINT.user.getRefreshAuth().url, {
    credentials: "include",
  });
}

// Access 토큰 확인 (읽기모드)
export async function getAccessToken() {
  const response = await fetchAPI<GetAccessTokenResponse>(
    API_ENDPOINT.user.getAccessToken().url
  );
  return response;
}

// useStudies 훅
export function useStudies(
  params: GetStudiesRequest,
  options?: StudiesQueryOptions
) {
  return useQuery<GetStudiesResponse, Error>(
    createStudiesQueryOptions(params, options)
  );
}

// useHotStudies 훅
export function useHotStudies(
  options?: Omit<
    UseQueryOptions<GetHotStudiesResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<GetHotStudiesResponse, Error>(
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
  UseQueryOptions<GetStudiesResponse, Error>,
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
    UseQueryOptions<GetHotStudiesResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return {
    queryKey: ["studies/hot"],
    queryFn: getHotStudies,
    ...options,
  };
};
