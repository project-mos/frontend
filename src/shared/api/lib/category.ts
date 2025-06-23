import { Method } from "@/shared/api/util/fetcher";

export const category = {
  getCategories: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/categories`,
    method: Method.GET,
  }),
};
