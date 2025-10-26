import {
  useUpdateProfileImg,
  useUpdateUserInfo,
} from "@/entities/user/model/user.queries";
import { ModalOnClose } from "@/shared/components/atoms/Modal";
import { useToast } from "@/shared/hooks/useToast";
import { GetUserInfoResult } from "@/shared/types/api/mypage";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface ProfileData {
  imagePath?: File | string;
  nickname: string;
  introduction: string;
  categories: string[];
}

const useUpdateProfile = (
  preview: string | undefined,
  onClose: ModalOnClose,
  userInfoData: GetUserInfoResult
) => {
  const { success, error } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewState, setPreviewState] = useState<string | undefined>(preview);
  const { nickname, introduction, imagePath } = userInfoData || {};

  // 닉네임, 한 줄 소개 수정 API
  const { mutate: updateUserInfo, isPending } = useUpdateUserInfo({
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
      console.log("err:", err);
    },
  });

  // 프로필 이미지 업데이트 API
  const { mutate: updateUserProfileImg } = useUpdateProfileImg();

  // useForm
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

  const isActiveBtn =
    formState.isValid &&
    !!methods.watch("nickname") &&
    !!methods.watch("introduction");

  return {
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
  };
};

export default useUpdateProfile;
