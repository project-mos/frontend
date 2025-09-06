import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../api/banner.api";

// 배너 다건 조회
export const useGetBanners = () =>
  useQuery({
    queryKey: ['banners'],
    queryFn: () => getBanners(),
  });