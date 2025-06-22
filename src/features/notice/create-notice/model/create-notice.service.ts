
import { NoticeRequest, NoticeResponse } from "@/entities/notice/model/notice.type";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";

export async function postNotice(studyId: number, data: NoticeRequest) {
  const {url, method} = API_ENDPOINT.notice.postNotice(studyId)

  return await fetchAPI<NoticeResponse>(url, {
    credentials:'include',
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
}

