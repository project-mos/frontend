import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotice,
  getNotices,
  postNotice,
  patchNotice,
  deleteNotice,
} from "@/entities/study/notice/api/notice.api";
import { NoticeRequest } from "@/entities/study/notice/api/notice.api.types";
import { usePachNoticeProps, UsePostNoticeProps } from "./notice.queries.types";

// queryKey
export const noticeKeys = {
  all: (studyId: number) => ["study", studyId, "notices"] as const,
  detail: (studyId: number, noticeId: number) =>
    ["study", studyId, "notices", noticeId] as const,
};

// 공지사항 전체 조회
export const useGetNotices = (studyId: number) =>
  useQuery({
    queryKey: noticeKeys.all(studyId),
    queryFn: () => getNotices(studyId),
    enabled: !!studyId,
  });

// 공지사항 단건 조회
export const useGetNotice = (studyId: number, noticeId: number) =>
  useQuery({
    queryKey: noticeKeys.detail(studyId, noticeId),
    queryFn: () => getNotice(studyId, noticeId),
    enabled: !!studyId && !!noticeId,
  });

// 공지사항 등록
export const usePostNotice = ({
  onSuccess,
  onError,
  studyId
}: UsePostNoticeProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NoticeRequest) => postNotice(studyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.all(studyId) });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

// 공지사항 수정
export const usePatchNotice = ({onSuccess,
  onError, studyId, noticeId}: usePachNoticeProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NoticeRequest) => patchNotice(studyId, noticeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.all(studyId) });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

// 공지사항 삭제
export const useDeleteNotice = ({onSuccess,
  onError, studyId, noticeId}: usePachNoticeProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteNotice(studyId, noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.all(studyId) });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
