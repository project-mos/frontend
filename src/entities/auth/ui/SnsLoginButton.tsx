import Typography from "@/shared/components/atoms/Typography";
import clsx from "clsx";
import { JSX } from "react";

interface SnsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  platform: "Kakao" | "Google" | "Naver";
  icon: JSX.Element;
  bgColor: string;
  hoverColor: string;
  textColor: string;
}

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
      className={clsx(
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

export default SnsLoginButton;
