import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";
import { GetStudyCategoriesResponse } from "@/shared/types/api/studies";

//Study 카테고리 조회(ISR)
export async function getCategories() {
  const response = await fetchAPI<GetStudyCategoriesResponse>(
    API_ENDPOINT.category.getCategories().url,
    {
      credentials: "include",
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  );
  return response;
}
