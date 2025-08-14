"use client";
import { useAuthStore } from "@/entities/auth/model/auth.store";
import {
  useGetLikeStudy,
  useLikeStudy,
  useUnLikeStudy,
} from "@/entities/study/studies/model/studies.queries";
import LoginModal from "@/features/login/ui/LoginModal";
import Meta from "@/shared/components/molecules/Meta";
import useModal from "@/shared/hooks/useModal";
import { useEffect, useMemo, useState } from "react";
import { MetaLikeProps } from "./landing.ui.types";

const MetaLike = ({ studyId, studyIds, disabled = false }: MetaLikeProps) => {
  const { isLoggedIn } = useAuthStore();
  const { isModalOpenState, openModal, closeModal } = useModal();
  const [accumulatedStudyIds, setAccumulatedStudyIds] = useState<number[]>(
    studyIds || []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = JSON.parse(localStorage.getItem("likedStudyIds") || "[]");
        setAccumulatedStudyIds(saved);
      } catch (e) {
        console.error("로컬스토리지 파싱 오류", e);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!accumulatedStudyIds || accumulatedStudyIds.length === 0) return;

    try {
      const existing = JSON.parse(
        localStorage.getItem("likedStudyIds") || "[]"
      );
      const merged = Array.from(new Set([...existing, ...accumulatedStudyIds]));
      localStorage.setItem("likedStudyIds", JSON.stringify(merged));
    } catch (err) {
      console.error("로컬스토리지 저장 중 오류", err);
    }
  }, [accumulatedStudyIds]);

  // 좋아요 get 요청
  const { data: likeStudyData } = useGetLikeStudy(studyId, accumulatedStudyIds);

  // 좋아요 리스트 데이터에서 스터디별 좋아요 상태를 찾음
  const findLikeStudy = useMemo(() => {
    return likeStudyData?.find((item) => item.studyId === studyId);
  }, [likeStudyData, studyId]);

  // 좋아요 post 요청
  const { mutate: likeStudy } = useLikeStudy({
    accumulatedStudyIds,
    studyId,
  });

  // 좋아요 delete 요청
  const { mutate: unLikeStudy } = useUnLikeStudy({
    accumulatedStudyIds,
    studyId,
  });

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    // 로그인 여부 확인
    if (!isLoggedIn) {
      openModal();
      return;
    }

    try {
      if (!findLikeStudy?.isLiked) {
        likeStudy();
      }

      if (findLikeStudy?.isLiked) {
        unLikeStudy();
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생", error);
    }
  };

  const iconClass = findLikeStudy?.isLiked
    ? "heart-fill text-red-500"
    : "heart";

  return (
    <>
      <LoginModal isOpen={isModalOpenState} onClose={closeModal} />
      <Meta
        icon={`${iconClass} text-[14px] mt-[3px] cursor-pointer`}
        className="min-w-3"
        onClick={disabled ? () => {} : handleClick}
      >
        {findLikeStudy?.likedCount ?? 0}
      </Meta>
    </>
  );
};

export default MetaLike;
