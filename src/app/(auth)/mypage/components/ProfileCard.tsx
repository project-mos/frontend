"use client";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Profile from "@/shared/components/atoms/Profile";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";

import profileImg from "@/asset/images/profile_example.jpeg";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import ProfileModal from "./ProfileModal";

const ProfileCard = () => {
  const { modal, openModal, closeModal } = useMultiModal();

  return (
    <>
      <Card>
        <Card.Content className="mb-[15px] items-center gap-[15px]">
          <Profile
            width={160}
            height={160}
            src={profileImg}
            className="mt-[45px]"
          />
          <Typography.Head3>홍길동</Typography.Head3>
          <Typography.P3 className="text-[14px] text-mos-gray-500">
            홍길동의 한줄 소개들어가유
          </Typography.P3>
          <div className="mb-[10px] flex gap-2">
            <Tag.Green border={true}>프로그래밍</Tag.Green>
            <Tag.Green border={true}>어학</Tag.Green>
          </div>
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
        <Card.Footer>
          <Typography.P3 className="mt-[10px] text-[14px] text-mos-gray-300">
            가입일: 2024-01-01
          </Typography.P3>
        </Card.Footer>
      </Card>

      <ProfileModal
        isOpen={modal.get("updateProfile")!}
        onClose={() => closeModal("updateProfile")}
      />
      <ActionConfirmModal
        isOpen={modal.get("logout")!}
        onClose={() => closeModal("logout")}
        type="action"
        content="정말 로그아웃 하시겠습니까?"
        title="로그아웃"
        buttonLabel="로그아웃"
      />
    </>
  );
};

export default ProfileCard;
