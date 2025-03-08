"use client";

import SvgIcons from "@/app/asset/icon/SvgIcons";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import Typography from "../atoms/Typography";
import { useState } from "react";
import LoginModal from "@/features/login/components/LoginModal";
import URL from "@/constants/URL";

interface NavItemProps {
  href: string;
  label: string;
  className?: string;
}

const NavItem = ({ href, label, className }: NavItemProps) => {
  return (
    <Link href={href} passHref>
      <Typography.P1
        className={`cursor-pointer font-bold text-mos-gray-500 ${className}`}
      >
        {label}
      </Typography.P1>
    </Link>
  );
};

const Header = () => {
  const isLoggedIn = false;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50  flex h-[55px] w-full justify-center border-b border-gray-200 bg-white">
        <div className="flex w-[90%] max-w-[1300px] items-center justify-between">
          {/* 왼쪽: 로고 */}
          <div>
            <Link href={URL.HOME} passHref>
              <SvgIcons.Logo />
            </Link>
          </div>

          {/* 중간: 스터디 만들기 버튼 */}
          <div>
            <NavItem href={URL.STUDY.CREATE} label="스터디 만들기" />
          </div>

          {/* 오른쪽: 마이페이지, 로그인 버튼 */}
          <div className="flex items-center gap-[20px]">
            <NavItem href={URL.MYPAGE} label="마이페이지" />
            {isLoggedIn ? (
              <Button.Solid color="Main" active className="h-[29px]">
                로그아웃
              </Button.Solid>
            ) : (
              <Button.Solid
                color="Main"
                active
                className="h-[29px]"
                onClick={() => setIsLoginModalOpen(true)}
              >
                로그인
              </Button.Solid>
            )}
          </div>
        </div>
      </header>
      {isLoginModalOpen && (
        <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
      )}
    </>
  );
};

export default Header;
