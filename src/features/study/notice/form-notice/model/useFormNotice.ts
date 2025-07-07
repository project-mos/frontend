import { NoticeRequest } from "@/entities/study/notice/api/notice.api.types";
import { useForm } from "react-hook-form";
import useFetchNotice from "../../fetch-notice/model/useFetchNotice";

const useFormNotice = (studyId: number) => {
  // 공지사항 단건 조회
  const { noticeData } = useFetchNotice(studyId);
  const noticeId = noticeData && noticeData.studyNoticeId;

  const methods = useForm<NoticeRequest>({
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
  });
  const { watch } = methods;
  const formNoticeData = watch();
  
  const isActiveBtn = !!formNoticeData.title && !!formNoticeData.content;

  return {
    methods,
    noticeData,
    isActiveBtn,
    noticeId,
  };
};

export default useFormNotice;
