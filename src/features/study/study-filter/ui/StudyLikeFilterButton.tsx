"use client";
import Button from "@/shared/components/atoms/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const StudyLikeFilterButton = () => {
  const currentSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onClickLiked = () => {
    const params = new URLSearchParams(currentSearchParams.toString());
    const liked = currentSearchParams.get("liked");
    const boolValue = liked === "true";

    if (liked === null) {
      params.set("liked", `${true}`);
    } else {
      params.set("liked", `${!boolValue}`);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <Button.Ghost
      color="Main"
      className=" hover:border-mos-main-500 hover:text-mos-main-500"
      active={currentSearchParams.get("liked") === "true"}
      disabled={false}
      onClick={onClickLiked}
    >
      <i className="bi bi-heart" />
      좋아요 보기
    </Button.Ghost>
  );
};

export default StudyLikeFilterButton;
