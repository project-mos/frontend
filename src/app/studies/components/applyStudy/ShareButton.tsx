"use client";
import Button from "@/shared/components/atoms/Button";
import ToastRenderer from "@/shared/components/system/ToastRenderer";
import { useToast } from "@/shared/hooks/useToast";
import { Tooltip } from "@heroui/tooltip";
import React from "react";

const ShareButton = () => {
  const toast = useToast();
  async function onShareButtonClick() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "이 페이지를 공유합니다.",
          url: window.location.href,
        });
      } else {
        toast.error("링크 복사를 이용해주세요!");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  }
  async function onCopyButtonClick() {
    const text = window.location.href;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("복사 성공!");
    } catch (err) {
      console.error(err);
      toast.success("복사 실패!");
    }
  }
  return (
    <>
      <ToastRenderer />
      <Tooltip
        content="링크 복사"
        className="rounded-md bg-mos-main-500 px-3 py-1.5 text-[14px] text-white shadow-md"
        placement="bottom"
      >
        <Button.Icon
          color="Main"
          className="flex-2 w-full"
          onClick={onCopyButtonClick}
        >
          <i className="bi bi-link-45deg text-[18px]" />
        </Button.Icon>
      </Tooltip>
      <Tooltip
        content="공유하기"
        className="rounded-md bg-mos-main-500 px-3 py-1.5 text-[14px] text-white shadow-md"
        placement="bottom"
      >
        <Button.Icon
          color="Main"
          className="w-full flex-1"
          onClick={onShareButtonClick}
        >
          <i className="bi bi-share" />
        </Button.Icon>
      </Tooltip>
    </>
  );
};

export default ShareButton;
