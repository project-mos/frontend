import { API_ENDPOINT, createJsonRequestInit, fetchAPI } from "@/shared/api/lib";
import { GetBannersResponse } from "./banner.api.type";

// 공지사항 다건 조회
export async function getBanners(): Promise<GetBannersResponse[]> {
  const { url, method } = API_ENDPOINT.study.getBanners();

  return await fetchAPI(url, createJsonRequestInit(method));
}