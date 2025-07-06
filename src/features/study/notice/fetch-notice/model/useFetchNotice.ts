import {
  useGetNotice,
  useGetNotices,
} from "@/entities/study/notice/model/notice.queries";
import { useNoticeStore } from "./fetchNotice.store";

const useFetchNotice = (studyId: number) => {
  const { noticeId } = useNoticeStore();
  const { data: noticesData } = useGetNotices(studyId);
  const { data: noticeData } = useGetNotice(studyId, noticeId!);

  // pinned true인 항목을 상단에 오도록 정렬
  const sortedNotices = noticesData?.slice().sort((a, b) => {
    return (b.pinned === true ? 1 : 0) - (a.pinned === true ? 1 : 0);
  });

  return { noticeId, noticesData: sortedNotices, noticeData };
};

export default useFetchNotice;
