export interface UsePostNoticeProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  studyId: number
}

export interface usePachNoticeProps extends UsePostNoticeProps {
  noticeId: number;
}