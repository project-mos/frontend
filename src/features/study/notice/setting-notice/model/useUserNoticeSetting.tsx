import { usePutUserNoticeSetting } from "@/entities/study/setting/model/setting.queries";
import { useToast } from "@/shared/hooks/useToast";

const useUserNoticeSetting = (studyId: number) => {
  const { success, error } = useToast();
  // 중요 공지 노출 여부 API
  const { mutate: userNoticeSetting, isPending } = usePutUserNoticeSetting({
    studyId,
    onSuccess: () => {
      success("설정되었습니다.");
    },
    onError: (err) => {
      error(String(err));
    },
  });

  return {
    userNoticeSetting,
    isPending,
  };
};

export default useUserNoticeSetting;
