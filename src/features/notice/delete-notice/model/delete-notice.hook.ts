import { NoticeResponse } from "@/entities/notice/model/notice.type";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { deleteNotice } from "./delete-notice.service";

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
