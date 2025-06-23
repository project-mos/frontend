import {
  NoticeRequest,
  NoticeResponse,
} from "@/entities/study/notice/api/notice.api.types";
import { fetchAPI } from "@/shared/api/lib";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";

export async function patchNotice(
  studyId: number,
  noticeId: number,
  data: NoticeRequest
) {
  const { url, method } = API_ENDPOINT.notice.patchNotice(studyId, noticeId);

  return await fetchAPI<NoticeResponse>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
