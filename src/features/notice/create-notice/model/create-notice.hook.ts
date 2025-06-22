import { NoticeRequest, NoticeResponse } from "@/entities/notice/model/notice.type";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { postNotice } from "./create-notice.service";

export function usePostNotice(studyId: number, options?: UseMutationOptions<NoticeResponse, Error, unknown>) {
  return useMutation({
    ...options,
    mutationFn: (data: NoticeRequest) => postNotice(studyId, data)
  })
}