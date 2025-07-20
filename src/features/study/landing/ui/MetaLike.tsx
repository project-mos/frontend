"use client";
import { useAuthStore } from "@/entities/auth/model/auth.store";
import {
  likeStudy,
  unLikeStudy,
} from "@/entities/study/studies/api/studies.api";
import LoginModal from "@/features/login/ui/LoginModal";
import Meta from "@/shared/components/molecules/Meta";
import useModal from "@/shared/hooks/useModal";
import { useState } from "react";

const MetaLike = ({ studyId }: { studyId: number }) => {
  const { isLoggedIn } = useAuthStore();
  const { isModalOpenState, openModal, closeModal } = useModal();
  const [likedCount, setLikedCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();

    // 로그인 여부 확인
    if (!isLoggedIn) {
      openModal();
      return;
    }

    try {
      if (!liked) {
        await likeStudy(studyId);
        setLiked(true);
        setLikedCount((prev) => prev + 1);
      } else {
        await unLikeStudy(studyId);
        setLiked(false);
        setLikedCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생", error);
    }
  };

  const iconClass = liked ? "heart-fill text-red-500" : "heart";

  return (
    <>
      <LoginModal isOpen={isModalOpenState} onClose={closeModal} />
      <Meta
        icon={`${iconClass} text-[14px] mt-[3px] cursor-pointer`}
        className="min-w-3"
        onClick={handleClick}
      >
        {likedCount}
      </Meta>
    </>
  );
};

export default MetaLike;
