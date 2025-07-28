"use client";
import { useAuthStore } from "@/entities/auth/model/auth.store";
import { GetStudiesRequest } from "@/entities/study/studies/api/studies.api.type";
import {
  useGetLikeStudy,
  useLikeStudy,
  useUnLikeStudy,
} from "@/entities/study/studies/model/studies.queries";
import LoginModal from "@/features/login/ui/LoginModal";
import Meta from "@/shared/components/molecules/Meta";
import useModal from "@/shared/hooks/useModal";

interface Props {
  studyId: number;
  studyIds: number[];
  studiesRequest?: GetStudiesRequest;
}

export interface GetLikeStudyResponse {
  studyId: number;
  likedCount: number;
  isLiked: boolean;
}
const MetaLike = ({ studyId, studyIds, studiesRequest }: Props) => {
  const { isLoggedIn } = useAuthStore();
  const { isModalOpenState, openModal, closeModal } = useModal();

  // 좋아요 get 요청
  const { data: likeStudyData } = useGetLikeStudy(studyId, studyIds);

  // 좋아요 리스트 데이터에서 스터디별 좋아요 상태를 찾음
  const findeLikeStudy = likeStudyData?.find(
    (item) => item.studyId === studyId
  );

  // 좋아요 post 요청
  const { mutate: likeStudy } = useLikeStudy({
    studyIds,
    studyId,
    studiesRequest,
  });

  // 좋아요 delete 요청
  const { mutate: unLikeStudy } = useUnLikeStudy({
    studyIds,
    studyId,
    studiesRequest,
  });

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    // 로그인 여부 확인
    if (!isLoggedIn) {
      openModal();
      return;
    }

    try {
      if (!findeLikeStudy?.isLiked) {
        likeStudy();
      }

      if (findeLikeStudy?.isLiked) {
        unLikeStudy();
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생", error);
    }
  };

  const iconClass = findeLikeStudy?.isLiked
    ? "heart-fill text-red-500"
    : "heart";

  return (
    <>
      <LoginModal isOpen={isModalOpenState} onClose={closeModal} />
      <Meta
        icon={`${iconClass} text-[14px] mt-[3px] cursor-pointer`}
        className="min-w-3"
        onClick={handleClick}
      >
        {findeLikeStudy?.likedCount ?? 0}
      </Meta>
    </>
  );
};

export default MetaLike;
