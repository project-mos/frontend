// notice qery key
export const NOTICE_QUERY_KEY = {
  all: (studyId: number) => ["getNotices", studyId],
  detail: (studyId: number, noticeId: number) => ["getNotices", studyId, noticeId],
}