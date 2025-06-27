import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { postNotice } from "./create-notice.service";
import {
  NoticeRequest,
  NoticeResponse,
} from "@/entities/study/notice/api/notice.api.types";

export function usePostNotice(
  studyId: number,
  options?: UseMutationOptions<NoticeResponse, Error, unknown>
) {
  return useMutation({
    ...options,
    mutationFn: (data: NoticeRequest) => postNotice(studyId, data),
  });
}
