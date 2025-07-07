import {
  getMaterial,
  getMaterials,
  postMaterials,
} from "@/entities/study/material/api/material.api";
import {
  GetMaterialsRequest,
  PostMaterialsRequest,
} from "@/entities/study/material/api/material.api.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 자료 목록 쿼리 키
export const MaterialsQueryKey = (studyId: string) => [
  "study",
  "materials",
  studyId,
];

// 자료 전체 목록
export const useGetMaterials = ({ studyId }: GetMaterialsRequest) => {
  return useQuery({
    queryKey: MaterialsQueryKey(studyId),
    queryFn: () => getMaterials({ studyId }),
    enabled: !!studyId,
    retry: false,
  });
};

// 개별 자료 조회
export const useGetMaterial = (studyId: string, materialId: string) => {
  return useQuery({
    queryKey: [...MaterialsQueryKey(studyId), materialId],
    queryFn: () => getMaterial(studyId, materialId),
    enabled: !!studyId && !!materialId,
    retry: false,
  });
};

// 자료 업로드
export const usePostMaterials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostMaterialsRequest) => postMaterials(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: MaterialsQueryKey(variables.studyId),
      });
    },
  });
};
