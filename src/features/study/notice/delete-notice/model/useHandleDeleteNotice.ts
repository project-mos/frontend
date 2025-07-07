import { useDeleteNotice } from "@/entities/study/notice/model/notice.queries";
import { useToast } from "@/shared/hooks/useToast";

const useHandleDeleteNotice = (studyId: number, noticeId: number, onSuccess?: () => void) => {
  const { success, error } = useToast();

  const { mutate: deleteNotices } = useDeleteNotice({
    studyId,
    noticeId: noticeId!,
    onSuccess: () => {
      success("삭제되었습니다.");
      onSuccess?.()
    },
    onError: (err) => {
      error(String(err));
    },
  });

  return { deleteNotices };
};

export default useHandleDeleteNotice;
