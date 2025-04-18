"use client";
import { useEffect } from "react";

import Typography from "@/shared/components/atoms/Typography";

import { useNoticeStore } from "@/shared/store/useNoticeStore";

const ImportantNoticeBar = () => {
  // 전역 상태 관리
  const { importantNotice, setImportantNotice } = useNoticeStore();

  useEffect(() => {
    const content = localStorage.getItem("importantNoticeContent");
    setImportantNotice(content);
  }, []);

  const onDeleteBarClick = () => {
    localStorage.removeItem("importantNoticeContent");
    setImportantNotice(null);
  };

  if (importantNotice) {
    return (
      <>
        <div className="fixed left-0 top-0 mt-[55px] flex h-[35px] w-full items-center justify-center border-b border-orange-200 bg-orange-50">
          <div className="flex w-[90%] max-w-[1300px] items-center justify-between">
            <Typography.P3 className="text-orange-400">
              <i className="bi bi-info-circle mr-2 text-orange-500"></i>
              {importantNotice}
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
  } else {
    return null;
  }
};

export default ImportantNoticeBar;
