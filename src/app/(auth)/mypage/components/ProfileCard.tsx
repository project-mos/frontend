"use client";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Profile from "@/shared/components/atoms/Profile";
import Typography from "@/shared/components/atoms/Typography";

import profileImg from "@/asset/images/profile_example.jpeg";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import ProfileModal from "@/app/(auth)/mypage/components/ProfileModal";
import { useQuery } from "@tanstack/react-query";
import { userInfoQueryOption } from "@/features/mypage/services/mypage.service";
import { useTokenStore } from "@/shared/store/authStore";
import { logout } from "@/shared/utils/logout";

const ProfileCard = () => {
  const { accessToken } = useTokenStore();
  const { modal, openModal, closeModal } = useMultiModal();
  // 유저 정보 조회
  const { data: userInfo } = useQuery(userInfoQueryOption(accessToken));

  const {
    nickname = "이름",
    introduction = "한 줄 소개를 등록해 주세요.",
    // categories,
    profileImage = profileImg,
    // joinDate = "0000-00-00",
  } = userInfo || {};

  const handleClickLogOut = () => {
    logout();
  };

  return (
    <>
      <Card>
        <Card.Content className="mb-[15px] items-center gap-[15px]">
          <Profile
            width={160}
            height={160}
            src={profileImage}
            className="mt-[45px]"
          />
          <Typography.Head3>{nickname}</Typography.Head3>
          <Typography.P3 className="mb-[26px] text-[14px] text-mos-gray-500">
            {introduction}
          </Typography.P3>
          {/* <div className="mb-[10px] flex gap-2">
            {Array.isArray(categories)
              ? categories.map((tag: string) => (
                  <Tag.Green key={tag} border={true}>
                    {tag}
                  </Tag.Green>
                ))
              : ["데이터 비어있음"].map((tag: string) => (
                  <Tag.Green key={tag} border={true}>
                    {tag}
                  </Tag.Green>
                ))}
          </div> */}
          <Button.Ghost
            color="Main"
            className="w-full"
            onClick={() => openModal("updateProfile")}
          >
            프로필 수정
          </Button.Ghost>
          <Button.Ghost
            color="Gray"
            className="w-full"
            onClick={() => openModal("logout")}
          >
            로그아웃
          </Button.Ghost>
        </Card.Content>
      </Card>

      <ProfileModal
        isOpen={modal.get("updateProfile")!}
        onClose={() => closeModal("updateProfile")}
        preview={profileImg.src}
        userInfoData={userInfo!}
        accessToken={accessToken!}
      />
      <ActionConfirmModal
        isOpen={modal.get("logout")!}
        onClose={() => closeModal("logout")}
        type="action"
        content="정말 로그아웃 하시겠습니까?"
        title="로그아웃"
        buttonLabel="로그아웃"
        onSuccess={handleClickLogOut}
      />
    </>
  );
};

export default ProfileCard;
