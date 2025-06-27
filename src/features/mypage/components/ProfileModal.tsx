/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";

import {
  usePostProfileImg,
  usePostUserInfo,
} from "@/features/mypage/services/mypage.service";
import LabelInput from "@/shared/components/molecules/LabelInput";
import { useToast } from "@/shared/hooks/useToast";
import { GetUserInfoResult } from "@/shared/types/api/mypage";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileModalProps extends ModalProps {
  preview?: string; // 프로필 사진 미리보기 url string
  onClose: ModalOnClose;
  userInfoData: GetUserInfoResult;
}

interface ProfileData {
  imagePath?: File | string;
  nickname: string;
  introduction: string;
  categories: string[];
}

const ProfileModal = ({
  preview,
  onClose,
  userInfoData,
  ...props
}: ProfileModalProps) => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  const { nickname, introduction, imagePath } = userInfoData || {};
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewState, setPreviewState] = useState<string | undefined>(preview);
  const methods = useForm<ProfileData>({
    defaultValues: {
      imagePath: imagePath || "",
      nickname: nickname || "",
      introduction: introduction || "",
      categories: ["HOBBY"], // 백엔드 카테고리 제거되면 뺴야 함
    },
    mode: "onChange",
  });
  const { handleSubmit, reset, control, formState } = methods;
  const isActiveBtn =
    formState.isValid &&
    !!methods.watch("nickname") &&
    !!methods.watch("introduction");

  useEffect(() => {
    if (userInfoData) {
      reset({
        imagePath: imagePath || "",
        nickname: nickname || "",
        introduction: introduction || "",
        categories: ["HOBBY"], // 백엔드 카테고리 제거되면 뺴야 함
      });
      // 프로필 이미지 미리보기 상태 업데이트
      setPreviewState(imagePath ? String(imagePath) : preview);
    }
  }, [userInfoData, reset, introduction, nickname]);

  // 닉네임, 한 줄 소개 수정 API
  const { mutate: updateUserInfo, isPending } = usePostUserInfo({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });
      success("프로필 정보가 수정되었습니다.");

      reset();
      onClose();
    },
    onError: (err) => {
      error("프로필 정보 수정 실패했습니다. 다시 시도해 주세요.");
      console.log(err);
    },
  });

  // 프로필 이미지 업데이트 API
  const { mutate: updateUserProfileImg } = usePostProfileImg();

  const onSubmit = (data: ProfileData) => {
    const { imagePath, ...rest } = data;

    // 이미지 처리
    if (imagePath instanceof File) {
      const formData = new FormData();
      formData.append("file", imagePath);
      formData.append("type", "USER");

      // 이미지 업로드 API 호출
      updateUserProfileImg(
        {
          file: formData.get("file") as File,
          type: formData.get("type") as string,
        },
        {
          onSuccess: () => {
            // 이미지 업로드 성공 시 받은 나머지 사용자 정보 업데이트
            updateUserInfo({
              ...rest,
            });
          },
          onError: (err) => {
            error("프로필 이미지 수정 실패했습니다. 다시 시도해 주세요.");
            console.log(err);
          },
        }
      );
    } else {
      // 새 이미지가 없는 경우 기본 정보만 업데이트
      updateUserInfo({
        ...rest,
      });
    }
  };

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
