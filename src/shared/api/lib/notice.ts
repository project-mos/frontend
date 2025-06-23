import { Method } from "@/shared/api/util/fetcher";

export const notice = {
  // 공지사항 다건 조회
  getNotices: (studyId: number) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/notices`,
      method: Method.GET,
    };
  },
  // 공지사항 단건 조회
  getNotice: (studyId: number, noticeId: number) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/notices/${noticeId}`,
      method: Method.GET,
    };
  },
  // 공지사항 생성
  postNotice: (studyId: number) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/notices`,
      method: Method.POST,
    };
  },
  // 공지사항 수정
  patchNotice: (studyId: number, noticeId: number) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/notices/${noticeId}`,
      method: Method.PATCH,
    };
  },
  // 공지사항 삭제
  deleteNotice: (studyId: number, noticeId: number) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/notices/${noticeId}`,
      method: Method.DELETE,
    };
  },
};
