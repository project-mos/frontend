
import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";
import { NoticeResponse } from "@/entities/notice/model/notice.type";

// 공지사항 다건 조회
export async function getNotices(studyId: number): Promise<NoticeResponse[]> {
  const {url, method} = API_ENDPOINT.notice.getNotices(studyId)

  return await fetchAPI(url, {
    credentials:"include",
    method: method,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

// 공지사항 단건 조회
export async function getNotice(studyId: number, noticeId: number): Promise<NoticeResponse> {
  const {url, method} = API_ENDPOINT.notice.getNotice(studyId, noticeId)

  return await fetchAPI(url, {
    credentials:"include",
    method: method,
    headers: {
      "Content-Type": "application/json"
    }
  })
}
