import { UseQueryOptions } from "@tanstack/react-query"
import { NOTICE_QUERY_KEY } from "./constants"
import { getNotice, getNotices } from "./fetch-notice.service"
import { NoticeResponse } from "@/entities/notice/model/notice.type"

export function noticesQueryOption(studyId:number, options?: UseQueryOptions<NoticeResponse[], Error>) {
  return {
    queryKey: NOTICE_QUERY_KEY.all(studyId),
    queryFn: () => getNotices(studyId),
    ...options,
  }
}

export function noticeQueryOption(studyId:number, noticeId: number, options?: UseQueryOptions<NoticeResponse[]>) {
  return {
    queryKey: NOTICE_QUERY_KEY.detail(studyId, noticeId),
    queryFn: () => getNotice(studyId, noticeId),
    ...options,
  }
}

