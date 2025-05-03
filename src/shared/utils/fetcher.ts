import { AxiosRequestConfig } from "axios";

import axiosInstance from "../lib/axios";

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export type ApiEndpoint = {
  url: string;
  method: Method;
};

interface FetchOptionsInterface extends AxiosRequestConfig {
  endpoint: ApiEndpoint;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
  revalidatePathName?: string; // 경로 재검증이 필요한 경우
}

/**
 * 
 * @example 
  async function getUserProfile() {
    const userId = '1234'
    const response = await fetchData<ResponseDataType>({
      endpoint: API_ENDPOINT.user.getUser(userId),
    });
  }
  
  ============================================================

  async function updateAndRevalidate() {
    const response = await fetchData<ResponseDataType>({
      endpoint: API_ENDPOINT.user.updateUser(),
      data: {
        "nickname" : "취준생",
        "introduction" : "백엔드 취준생"
      },
      revalidatePathName: '/user', // 이 경로의 캐시를 무효화
    });
  }
 */

export async function fetchData<T>({
  endpoint,
  data,
  params,
  revalidatePathName,
  ...rest
}: FetchOptionsInterface): Promise<T> {
  const { url, method } = endpoint;

  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      params,
      ...rest,
    });

    // 캐시 무효화 (서버 환경일 때만 실행)
    if (revalidatePathName && typeof window === "undefined") {
      const { revalidatePath } = await import("next/cache");
      revalidatePath(revalidatePathName);
    }

    return response.data;
  } catch (error) {
    console.error(`❌ ${method} 요청 실패:`, error);
    throw error;
  }
}
