import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { deleteNotice } from "./delete-notice.service";
import type { NoticeResponse } from "@/entities/study/notice/api/notice.api.types";

export function useDeleteNotice(
  studyId: number,
  noticeId: number,
  options?: UseMutationOptions<NoticeResponse, Error, unknown>
) {
  return useMutation({
    ...options,
    mutationFn: () => deleteNotice(studyId, noticeId),
  });
}
