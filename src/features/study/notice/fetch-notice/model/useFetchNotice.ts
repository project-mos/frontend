import {
  useGetNotice,
  useGetNotices,
} from "@/entities/study/notice/model/notice.queries";
import { useNoticeStore } from "./fetchNotice.store";

const useFetchNotice = (studyId: number) => {
  const { noticeId } = useNoticeStore();
  const { data: noticesData } = useGetNotices(studyId);
  const { data: noticeData } = useGetNotice(studyId, noticeId!);

  return { noticeId, noticesData, noticeData };
};

export default useFetchNotice;
