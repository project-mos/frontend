"use client";
import useStudyFilter from "@/features/study/study-filter/model/useStudyFilter";
import Button from "@/shared/components/atoms/Button";

const StudyLikeFilterButton = () => {
  const { onClickLiked, searchParams } = useStudyFilter();
  return (
    <Button.Ghost
      color="Main"
      className=" hover:border-mos-main-500 hover:text-mos-main-500"
      active={searchParams.get("liked") === "true"}
      disabled={false}
      onClick={onClickLiked}
    >
      <i className="bi bi-heart" />
      좋아요 보기
    </Button.Ghost>
  );
};

export default StudyLikeFilterButton;
