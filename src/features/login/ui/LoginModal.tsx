"use client";
import cn from "@/shared/utils/cn";
import { JSX } from "react";

import SvgIcons from "@/asset/icon/SvgIcons";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import URL from "@/shared/constants/URL";
import { requestNotificationPermission } from "@/shared/utils/firebase";

interface ScheduleModalProps extends ModalProps {
  onClose: ModalOnClose;
  redirectUrl?: string;
}

interface SnsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  platform: "Kakao" | "Google" | "Naver";
  icon: JSX.Element;
  bgColor: string;
  hoverColor: string;
  textColor: string;
}

const LoginModal = ({ onClose, redirectUrl, ...props }: ScheduleModalProps) => {
  const callbackUrl = redirectUrl ? `,${encodeURIComponent(redirectUrl)}` : "";

  const onClickKakaoLoginButton = async () => {
    await requestNotificationPermission();
    window.location.href = `${URL.LOGIN.KAKAO}?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&state=KAKAO${callbackUrl}`;
  };

  const onClickGoogleLoginButton = async () => {
    await requestNotificationPermission();
    window.location.href = `${URL.LOGIN.GOOGLE}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=email%20profile&state=GOOGLE`;
  };

  const onClickNaverLoginButton = async () => {
    await requestNotificationPermission();
    window.location.href = `${URL.LOGIN.NAVER}?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&state=NAVER`;
  };

  return (
    <Modal {...props} onClose={onClose} className="max-w-[400px]">
      <Modal.Header onClose={onClose}></Modal.Header>
      <Modal.Content className="w-full text-center">
        <SvgIcons.Logo width={183} height={50} className="mx-auto" />
        <Typography.P1 className="my-[5px] text-[20px]">
          스터디 모집부터 진행까지
        </Typography.P1>
        <Typography.P3 className="mb-[30px] text-mos-gray-700">
          함께 성장할 스터디원을 찾고
          <span className="block">체계적으로 스터디를 관리해보세요</span>
        </Typography.P3>
      </Modal.Content>

      <Modal.Footer className="block">
        <SnsLoginButton
          platform="Kakao"
          icon={<SvgIcons.Kakao />}
          bgColor="bg-kakao"
          hoverColor="hover:bg-kakao-hover"
          textColor="text-black"
          onClick={onClickKakaoLoginButton}
        />
        <SnsLoginButton
          platform="Naver"
          icon={<SvgIcons.Naver />}
          bgColor="bg-naver"
          hoverColor="hover:bg-naver-hover"
          textColor="text-white"
          onClick={onClickNaverLoginButton}
        />
        <SnsLoginButton
          platform="Google"
          icon={<SvgIcons.Google />}
          bgColor="bg-white"
          hoverColor="hover:bg-google-hover"
          textColor="text-black"
          onClick={onClickGoogleLoginButton}
        />
        {/* <SnsLoginButton
          platform="Github"
          icon={<i className="bi bi-github text-white"></i>}
          bgColor="bg-black"
          hoverColor="hover:bg-black"
          textColor="text-white"
        /> */}
      </Modal.Footer>
    </Modal>
  );
};

const SnsLoginButton = ({
  platform,
  icon,
  bgColor,
  hoverColor,
  textColor,
  onClick,
}: SnsButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        bgColor,
        hoverColor,
        "my-[15px] flex w-full items-center justify-center gap-[10px] rounded-lg py-[10px] transition-all duration-200",
        platform === "Google" && "border border-gray-300"
      )}
    >
      {icon}
      <Typography.P3 className={`font-semibold ${textColor}`}>
        {platform} 로그인
      </Typography.P3>
    </button>
  );
};

export default LoginModal;
