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

import { updateUserInfo } from "@/features/mypage/services/mypage.service";
import LabelInput from "@/shared/components/molecules/LabelInput";
import { useToast } from "@/shared/hooks/useToast";
import {
  GetUserInfoResult,
  UpdateUserInfoResult,
} from "@/shared/types/api/mypage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ProfileModalProps extends ModalProps {
  preview?: string; // 프로필 사진 미리보기 url string
  onClose: ModalOnClose;
  userInfoData: GetUserInfoResult;
  accessToken: string | undefined;
}

interface ProfileData {
  img?: File;
  nickname: string;
  introduction: string;
  categories: string[];
}

const ProfileModal = ({
  preview,
  onClose,
  userInfoData,
  accessToken,
  ...props
}: ProfileModalProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<ProfileData>({
    defaultValues: {
      nickname: "",
      introduction: "",
      categories: [],
    },
    mode: "onChange",
  });
  const [previewState, setPreviewState] = useState<string | undefined>(preview);
  const { handleSubmit, reset, control, formState } = methods;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const {
    nickname,
    introduction,
    // categories,
    // profileImage = profileImg,
    // joinDate = "0000-00-00",
  } = userInfoData || {};

  useEffect(() => {
    if (userInfoData) {
      reset({
        nickname: nickname || "",
        introduction: introduction || "",
        categories: ["HOBBY"], // 백엔드 카테고리 제거되면 뺴야 함
      });
    }
  }, [userInfoData, reset]);

  const updateUserInfoData = useMutation({
    mutationFn: ({
      accessToken,
      submitData,
    }: {
      accessToken: string;
      submitData: UpdateUserInfoResult;
    }) => updateUserInfo(accessToken!, submitData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userInfo", accessToken],
      });
      toast.success("프로필 정보가 수정되었습니다.");
    },
  });

  const onSubmit = (data: ProfileData) => {
    const submitData = { ...data }; // data 객체 복사
    delete submitData.img; // 백엔드 요청 데이터에 맞게 우선 img 빼둠

    updateUserInfoData.mutate({
      accessToken: accessToken!,
      submitData,
    });

    // setPreviewState(undefined);
    reset();
    onClose();
  };

  const onClickCloseBtn = () => {
    setPreviewState(preview);
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
                  name="img"
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
            {/* <LabelTagInput
              name="tags"
              label="태그"
              placeholder="태그를 입력하세요"
            /> */}
          </Modal.Content>

          <Modal.Footer>
            <Button.Default onClick={onClickCloseBtn}>취소</Button.Default>
            <Button.Solid
              type="submit"
              color="Main"
              active={formState.isValid}
              disabled={!formState.isValid}
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
