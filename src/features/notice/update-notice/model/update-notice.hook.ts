import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { patchNotice } from "./update-notice.service";
import {
  NoticeRequest,
  NoticeResponse,
} from "@/entities/study/notice/api/notice.api.types";

export function usePatchNotice(
  studyId: number,
  noticeId: number,
  options?: UseMutationOptions<NoticeResponse, Error, unknown>
) {
  return useMutation({
    ...options,
    mutationFn: (data: NoticeRequest) => patchNotice(studyId, noticeId, data),
  });
}
