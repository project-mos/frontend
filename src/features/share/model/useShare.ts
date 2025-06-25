import { useToast } from "@/shared/hooks/useToast";

const useShare = () => {
  const toast = useToast();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  async function onShareButtonClick() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "이 페이지를 공유합니다.",
          url: currentUrl,
        });
      } else {
        toast.error("링크 복사를 이용해주세요!");
      }
    } catch (err) {
      console.error(err);
      // toast.error(`공유 실패!`);
    }
  }
  async function onCopyButtonClick() {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("복사 성공!");
    } catch (err) {
      console.error(err);
      toast.success("복사 실패!");
    }
  }
  return { onShareButtonClick, onCopyButtonClick };
};

export default useShare;
