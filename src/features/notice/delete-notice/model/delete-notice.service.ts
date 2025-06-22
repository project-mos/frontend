import { NoticeResponse } from "@/entities/notice/model/notice.type";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";

// 공지사항 삭제
export async function deleteNotice(studyId: number, noticeId: number) {
  const {url, method} = API_ENDPOINT.notice.deleteNotice(studyId, noticeId)

  return await fetchAPI<NoticeResponse>(url, {
    credentials:'include',
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

