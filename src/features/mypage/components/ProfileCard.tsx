"use client";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Profile from "@/shared/components/atoms/Profile";
import Typography from "@/shared/components/atoms/Typography";

import profileImg from "@/asset/images/defaultProfile.png";
import ProfileModal from "@/features/mypage/components/ProfileModal";
import { userInfoQueryOption } from "@/features/mypage/services/mypage.service";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import { useToast } from "@/shared/hooks/useToast";
import { logout } from "@/shared/utils/logout";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ProfileCard = () => {
  const { modal, openModal, closeModal } = useMultiModal();
  // 유저 정보 조회
  const { data: userInfo } = useQuery(userInfoQueryOption());
  const toast = useToast();

  const {
    nickname = "이름",
    introduction = "한 줄 소개를 등록해 주세요.",
    imagePath = profileImg,
  } = userInfo || {};

  const handleClickLogOut = () => {
    logout();
  };

  useEffect(() => {
    if (localStorage.getItem("leave") == "true") {
      toast.success("스터디 탈퇴에 성공하였습니다.");
      localStorage.removeItem("leave");
    }
    if (localStorage.getItem("delete") == "true") {
      toast.success("스터디 삭제를 성공하였습니다.");
      localStorage.removeItem("delete");
    }
  }, []);

  return (
    <>
      <Card>
        <Card.Content className="mb-[15px] items-center gap-[15px]">
          <Profile
            width={160}
            height={160}
            src={imagePath}
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
            disabled={false}
          >
            프로필 수정
          </Button.Ghost>
          <Button.Ghost
            color="Gray"
            className="w-full"
            onClick={() => openModal("logout")}
            disabled={false}
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
