"use client";

import Typography from "@/shared/components/atoms/Typography";
import useFetchNotice from "@/features/study/notice/fetch-notice/model/useFetchNotice";
import { useGetStudySettings } from "@/entities/study/setting/model/setting.queries";
import useHideImportantNotice from "@/features/study/notice/delete-notice/model/useHideImportantNotice";

const ImportantNoticeBar = ({ studyId }: { studyId: number }) => {
  const { noticesData } = useFetchNotice(studyId);

  const importantNotice = noticesData?.find((item) => item.important);

  // 유저 스터디 설정 조회
  const { data: userStudySetting } = useGetStudySettings(studyId);
  // 중요 공지 닫기
  const { hideImportantNotices } = useHideImportantNotice(studyId);

  const onDeleteBarClick = async () => {
    hideImportantNotices();
  };

  if (!userStudySetting?.noticePined || !importantNotice) {
    return null;
  }

  return (
    <>
      <div className="fixed left-0 top-0 mt-[55px] flex w-full items-center justify-center border-b border-orange-200 bg-orange-50">
        <div className="flex w-[90%] max-w-[1300px] items-center justify-between">
          <Typography.P3
            className="w-full cursor-pointer overflow-hidden truncate whitespace-nowrap text-orange-400"
            title={importantNotice.content}
          >
            <i className="bi bi-info-circle mr-2 text-orange-500"></i>
            {importantNotice.content}
          </Typography.P3>
          <i
            className="bi bi-x cursor-pointer text-[23px] text-orange-500"
            onClick={onDeleteBarClick}
          ></i>
        </div>
      </div>
      <div className="mb-10"></div>
    </>
  );
};

export default ImportantNoticeBar;
