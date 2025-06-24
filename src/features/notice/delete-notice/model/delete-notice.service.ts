import { NoticeResponse } from "@/entities/study/notice/api/notice.api.types";
import { fetchAPI } from "@/shared/api/lib";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";

// 공지사항 삭제
export async function deleteNotice(studyId: number, noticeId: number) {
  const { url, method } = API_ENDPOINT.notice.deleteNotice(studyId, noticeId);

  return await fetchAPI<NoticeResponse>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
