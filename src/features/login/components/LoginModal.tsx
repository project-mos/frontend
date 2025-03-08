import Typography from "@/components/atoms/Typography";
import Modal from "@/components/atoms/Modal";
import { Dispatch, JSX, SetStateAction } from "react";
import SvgIcons from "@/app/asset/icon/SvgIcons";
import { cn } from "@/lib/utils";

interface LoginModalProps {
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface SnsButtonProps {
  platform: string;
  icon: JSX.Element;
  bgColor: string;
  hoverColor: string;
  textColor: string;
}

const LoginModal = ({ setIsLoginModalOpen }: LoginModalProps) => {
  return (
    <Modal setIsOpenModal={setIsLoginModalOpen}>
      <Modal.Content className="w-[350px] text-center">
        <SvgIcons.Logo width={183} height={50} className="mx-auto" />
        <Typography.P1 className="my-[5px] text-[20px]">
          스터디 모집부터 진행까지
        </Typography.P1>
        <Typography.P3 className="mb-[30px] text-mos-gray-700">
          함께 성장할 스터디원을 찾고
          <span className="block">체계적으로 스터디를 관리해보세요</span>
        </Typography.P3>
      </Modal.Content>

      <Modal.Button className="block">
        <SnsLoginButton
          platform="Kakao"
          icon={<SvgIcons.Kakao />}
          bgColor="bg-kakao"
          hoverColor="hover:bg-kakao-hover"
          textColor="text-black"
        />
        <SnsLoginButton
          platform="Naver"
          icon={<SvgIcons.Naver />}
          bgColor="bg-naver"
          hoverColor="hover:bg-naver-hover"
          textColor="text-white"
        />
        <SnsLoginButton
          platform="Google"
          icon={<SvgIcons.Google />}
          bgColor="bg-white"
          hoverColor="hover:bg-google-hover"
          textColor="text-black"
        />
        <SnsLoginButton
          platform="Github"
          icon={<i className="bi bi-github text-white"></i>}
          bgColor="bg-black"
          hoverColor="hover:bg-black"
          textColor="text-white"
        />
      </Modal.Button>
    </Modal>
  );
};

const SnsLoginButton = ({
  platform,
  icon,
  bgColor,
  hoverColor,
  textColor,
}: SnsButtonProps) => {
  return (
    <button
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
