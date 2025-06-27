import { useQuery } from "@tanstack/react-query";

import { fetchAPI } from "@/shared/api/util/fetcher";
import { API_ENDPOINT } from "@/shared/api/lib";

// 카테고리 쿼리 키
export const CategoriesQueryKey = ["study", "categories"];

// 카테고리 목록 조회
export const useGetCategories = () => {
  return useQuery({
    queryKey: CategoriesQueryKey,
    queryFn: () => fetchAPI(API_ENDPOINT.category.getCategories().url),
    retry: false,
  });
};
