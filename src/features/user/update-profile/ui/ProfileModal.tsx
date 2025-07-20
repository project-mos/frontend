/* eslint-disable @next/next/no-img-element */
"use client";
import { Controller, FormProvider } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";

import LabelInput from "@/shared/components/molecules/LabelInput";
import { GetUserInfoResult } from "@/shared/types/api/mypage";

import useUpdateProfile from "@/features/user/update-profile/model/useUpdateProfile";

interface ProfileModalProps extends ModalProps {
  preview?: string; // 프로필 사진 미리보기 url string
  onClose: ModalOnClose;
  userInfoData: GetUserInfoResult;
}
const ProfileModal = ({
  preview,
  onClose,
  userInfoData,
  ...props
}: ProfileModalProps) => {
  const {
    fileInputRef,
    previewState,
    setPreviewState,
    formState,
    onSubmit,
    handleSubmit,
    methods,
    control,
    reset,
    isActiveBtn,
    isPending,
  } = useUpdateProfile(preview, onClose, userInfoData);

  const onClickCloseBtn = () => {
    reset();
    onClose();
  };

  // 이미지 클릭 시 파일 업로드 창 열기
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onClickCloseBtn}>
        <Modal.Header onClose={onClickCloseBtn}>
          <Typography.Head3>프로필 수정</Typography.Head3>
        </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Content className="flex flex-col gap-5">
            <div className="flex justify-center">
              <div className="max-h-40 max-w-40">
                <Controller
                  name="imagePath"
                  control={control}
                  rules={{
                    required: previewState ? false : "이미지를 넣어주세요.", // previewState가 있으면 required 무시
                    validate: {
                      fileExists: (value) => {
                        if (previewState) return true; // previewState가 있으면 유효성 검사 통과
                        return (
                          (value instanceof File && value.size > 0) ||
                          "이미지를 넣어주세요."
                        );
                      },
                    },
                  }}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <>
                      {previewState ? (
                        <img
                          alt="profile-img"
                          src={previewState}
                          className="size-40 rounded-full bg-cover bg-center shadow-md"
                          onClick={handleImageClick}
                        />
                      ) : (
                        <div
                          className="size-40 cursor-pointer rounded-full bg-slate-500"
                          onClick={handleImageClick}
                        />
                      )}

                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPreviewState(URL.createObjectURL(file));
                            onChange(file); // react-hook-form에 파일 업데이트
                          }
                        }}
                      />
                      {error && (
                        <p className="mt-1 text-sm text-red-500">
                          {error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            <LabelInput
              label="닉네임"
              name="nickname"
              placeholder="닉네임을 입력하세요."
              required
              registerOptions={{ required: "필수 입력입니다." }}
            />
            <LabelInput
              label="한 줄 소개"
              name="introduction"
              placeholder="한 줄 소개를 입력하세요."
              required
              registerOptions={{ required: "필수 입력입니다." }}
            />
          </Modal.Content>

          <Modal.Footer>
            <Button.Ghost
              color="Gray"
              onClick={onClickCloseBtn}
              disabled={false}
            >
              취소
            </Button.Ghost>
            <Button.Solid
              type="submit"
              color="Main"
              active={formState.isValid}
              disabled={!isActiveBtn && isPending}
            >
              확인
            </Button.Solid>
          </Modal.Footer>
        </form>
      </Modal>
    </FormProvider>
  );
};

export default ProfileModal;
