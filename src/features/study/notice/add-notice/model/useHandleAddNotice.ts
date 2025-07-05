import { usePostNotice } from "@/entities/study/notice/model/notice.queries";
import { useToast } from "@/shared/hooks/useToast";
import { useState } from "react";

const useHandleAddNotice = (
  studyId: number,
) => {
  const { success, error } = useToast();
  const [isCreate, setIsCreate] = useState<boolean>(false);

  // 공지사항 생성 API
  const { mutate: createNotice, isPending: isCreating } = usePostNotice({
    studyId,
    onSuccess: () => {
      success("등록되었습니다.");
    },
    onError: (err) => {
      error(String(err));
    },
  });

  return {
    isCreate,
    setIsCreate,
    createNotice,
    isCreating,
  };
};

export default useHandleAddNotice;
