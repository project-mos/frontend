import {
  deleteMember,
  getMembers,
} from "@/entities/study/member/api/member.api";
import { GetStudyMembersResponse } from "@/entities/study/member/api/member.api.type";
import useDecodeToken from "@/shared/hooks/useDecodeToken";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// 현재 스터디룸에서 나의 멤버 역할이 무엇인지 알려주는 훅
export function useMyStudyRole(studyId: string) {
  const decodeToken = useDecodeToken();
  const { data: members } = useGetMembers(studyId);

  if (decodeToken && members) {
    return members?.find((member) => member.userId === decodeToken.id)
      ?.studyMemberRoleType;
  } else {
    return null;
  }
}
