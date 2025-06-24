import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMembers,
  deleteMember,
} from "@/entities/study/member/api/member.api";
import { GetStudyMembersResponse } from "@/entities/study/member/api/member.api.types";

// 쿼리 키 생성 함수
export const MembersQueryKey = (studyId: string) => [
  "study",
  "members",
  studyId,
];

// 구성원 목록 조회
export const useGetMembers = (studyId: string) => {
  return useQuery<GetStudyMembersResponse>({
    queryKey: MembersQueryKey(studyId),
    queryFn: () => getMembers(studyId),
    enabled: !!studyId,
    retry: false,
  });
};

// 구성원 삭제 (ex: 탈퇴 기능 등)
export const useDeleteMember = (studyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMember(studyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MembersQueryKey(studyId),
      });
    },
  });
};
