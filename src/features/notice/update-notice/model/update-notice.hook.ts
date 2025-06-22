import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { patchNotice } from "./update-notice.service";
import { NoticeRequest, NoticeResponse } from "@/entities/notice/model/notice.type";

export function usePatchNotice(studyId: number, noticeId: number, options?: UseMutationOptions<NoticeResponse, Error, unknown>) {
  return useMutation({
    ...options,
    mutationFn: (data: NoticeRequest) => patchNotice(studyId, noticeId, data)
    
  })
}