import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getHotStudies,
  getLikeStudy,
  likeStudy,
  unLikeStudy,
} from "@/entities/study/studies/api/studies.api";
import { useRouter } from "next/navigation";
import { GetStudiesRequest } from "../api/studies.api.type";

// queryKey
export const likeStudyQueryKeys = (studyIds: number[]) =>
  ["studyLike", studyIds] as const;

// 좋아요 누른 스터디 전체 조회
export const useGetLikeStudy = (studyId: number, studyIds: number[]) =>
  useQuery({
    queryKey: likeStudyQueryKeys(studyIds),
    queryFn: () => getLikeStudy(studyIds),
    enabled: !!studyId,
  });

// 좋아요 post 요청
export const useLikeStudy = ({
  studyId,
  studyIds,
}: {
  studyId: number;
  studyIds: number[];
  studiesRequest?: GetStudiesRequest;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => likeStudy(studyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: likeStudyQueryKeys(studyIds),
      });

      // 스터디/핫 스터디 데이터 업데이트
      getHotStudies();
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// 좋아요 Delete 요청
export const useUnLikeStudy = ({
  studyId,
  studyIds,
}: {
  studyId: number;
  studyIds: number[];

  studiesRequest?: GetStudiesRequest;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => unLikeStudy(studyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: likeStudyQueryKeys(studyIds),
      });

      // 스터디/핫 스터디 데이터 업데이트
      getHotStudies();
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
