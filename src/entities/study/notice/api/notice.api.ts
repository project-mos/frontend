import {
  NoticeRequest,
  NoticeResponse,
} from "@/entities/study/notice/api/notice.api.types";
import {
  API_ENDPOINT,
  createJsonRequestInit,
  fetchAPI,
} from "@/shared/api/lib";

// 공지사항 단건 조회
export async function getNotice(
  studyId: number,
  noticeId: number
): Promise<NoticeResponse> {
  const { url, method } = API_ENDPOINT.notice.getNotice(studyId, noticeId);

  return await fetchAPI(url, createJsonRequestInit(method));
}

// 공지사항 다건 조회
export async function getNotices(studyId: number): Promise<NoticeResponse[]> {
  const { url, method } = API_ENDPOINT.notice.getNotices(studyId);

  return await fetchAPI(url, createJsonRequestInit(method));
}

// 공지사항 삭제
export async function deleteNotice(studyId: number, noticeId: number) {
  const { url, method } = API_ENDPOINT.notice.deleteNotice(studyId, noticeId);

  return await fetchAPI<NoticeResponse>(url, createJsonRequestInit(method));
}
// 공지사항 등록
export async function postNotice(studyId: number, data: NoticeRequest) {
  const { url, method } = API_ENDPOINT.notice.postNotice(studyId);

  return await fetchAPI<NoticeResponse>(
    url,
    createJsonRequestInit(method, data)
  );
}
// 공지사항 수정
export async function patchNotice(
  studyId: number,
  noticeId: number,
  data: NoticeRequest
) {
  const { url, method } = API_ENDPOINT.notice.patchNotice(studyId, noticeId);

  return await fetchAPI<NoticeResponse>(
    url,
    createJsonRequestInit(method, data)
  );
}
