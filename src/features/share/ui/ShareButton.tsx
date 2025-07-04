"use client";
import useShare from "@/features/share/model/useShare";
import { ShareButtonProps } from "@/features/share/ui/share.ui.type";
import Button from "@/shared/components/atoms/Button";

import { Tooltip } from "@heroui/tooltip";

const ShareButton = ({ type }: ShareButtonProps) => {
  const title = type === "copy" ? "링크 복사" : "공유하기";
  const icon = type === "copy" ? "bi bi-link-45deg" : "bi bi-share text-[14px]";
  const { onShareButtonClick, onCopyButtonClick } = useShare();

  async function onClickButton() {
    if (type === "copy") await onCopyButtonClick();
    else if (type === "share") await onShareButtonClick();
  }
  return (
    <Tooltip
      content={title}
      className="rounded-md bg-mos-main-500 px-3 py-1.5 text-[14px] text-white shadow-md"
      placement="bottom"
    >
      <Button.Icon
        color="Main"
        className="flex-2 w-full"
        onClick={onClickButton}
      >
        <i className={icon} />
      </Button.Icon>
    </Tooltip>
  );
};

export default ShareButton;
