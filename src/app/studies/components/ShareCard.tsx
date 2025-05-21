"use client";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import ToastRenderer from "@/shared/components/ToastRenderer";
import { useToast } from "@/shared/hooks/useToast";

const ShareCard = () => {
  const toast = useToast();
  function onShareButtonClick() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "이 페이지를 공유합니다.",
        url: window.location.href,
      });
    } else {
      toast.error("링크 복사를 이용해주세요!");
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
    <Card className="h-auto">
      <ToastRenderer />
      <Card.Header className="mb-[15px]">
        <Typography.SubTitle1>공유하기</Typography.SubTitle1>
      </Card.Header>

      <Card.Footer>
        <div className="flex w-full gap-2">
          <Button.Icon
            color="Main"
            className="flex-2 w-full"
            onClick={onCopyButtonClick}
          >
            <i className="bi bi-link-45deg text-[18px]" />
            링크복사
          </Button.Icon>
          <Button.Icon
            color="Main"
            className="w-full flex-1"
            onClick={onShareButtonClick}
          >
            <i className="bi bi-share" />
          </Button.Icon>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ShareCard;
