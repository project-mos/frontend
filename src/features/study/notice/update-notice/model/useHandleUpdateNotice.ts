import { usePatchNotice } from "@/entities/study/notice/model/notice.queries";
import { useToast } from "@/shared/hooks/useToast";
import { useState } from "react";

const useHandleUpdateNotice = (
  studyId: number,
  noticeId: number,
) => {
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false);
  const { success, error } = useToast();
  const { mutate: updateNotice, isPending: isUpdating } = usePatchNotice({
    studyId,
    noticeId: noticeId!,
    onSuccess: () => {
      success('수정되었습니다.')
      setIsModifyMode(false)
    },
    onError: (err) => {
      error(String(err));
    },
  });

  return { isModifyMode, setIsModifyMode, updateNotice, isUpdating };
};

export default useHandleUpdateNotice;
