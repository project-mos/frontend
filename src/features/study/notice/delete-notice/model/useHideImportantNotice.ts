import { usePutImportantNotice } from "@/entities/study/notice/model/notice.queries";
import { useToast } from "@/shared/hooks/useToast";

const useHideImportantNotice = (studyId: number) => {
  const { error } = useToast();

  const { mutateAsync: hideImportantNotices } = usePutImportantNotice({
    studyId,
    onError: (err) => {
      error(String(err));
    },
  });

  return { hideImportantNotices };
};

export default useHideImportantNotice;
