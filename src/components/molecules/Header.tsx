"use client";

import SvgIcons from "@/app/asset/icon/SvgIcons";
import useModal from "@/app/hooks/useModal";
import Button from "@/components/atoms/Button";
import { ADMIN_MENU_ITEMS, MENU_ITEMS } from "@/constants/SidebarItems";
import URL from "@/constants/URL";
import LoginModal from "@/features/login/components/LoginModal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Typography from "../atoms/Typography";

const Header = () => {
  const isLoggedIn = true;
  const { modal, openModal, closeModal } = useModal();

  return (
    <>
      <LoginModal isOpen={modal} onClose={closeModal} />
      <header className="header fixed left-0 top-0 flex h-[55px] w-full justify-center border-b border-gray-200 bg-white">
        <div className="flex w-[90%] max-w-[1300px] items-center justify-between">
          {/* 왼쪽: 로고 */}
          <div>
            <Link href={URL.HOME} passHref>
              <SvgIcons.Logo />
            </Link>
          </div>

          {/* 오른쪽: 마이페이지, 로그인 버튼 */}
          <nav className="flex items-center gap-[20px]">
            {/* 로그인 했을 때 */}
            {isLoggedIn ? (
              <>
                {/* 반응형 */}
                <Link href={`${URL.STUDY.CREATE}?step=1`} title="스터디 만들기">
                  <i className="bi-marker-tip hidden text-[34px] text-mos-gray-700 transition-all duration-200 hover:text-mos-main-500 active:text-mos-main-500 tablet:inline-block" />
                </Link>
                <Link href={URL.MYPAGE} title="마이페이지">
                  <i className="bi-person-circle hidden text-[34px] text-mos-gray-700 transition-all duration-200 hover:text-mos-main-500 active:text-mos-main-500 tablet:inline-block" />
                </Link>

                <Sidebar />
              </>
            ) : (
              <Button.Solid
                color="Main"
                active
                className="h-[29px]"
                onClick={openModal}
              >
                로그인
              </Button.Solid>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isStudyRoom = pathname.split("/")?.[1] === "study-room"; // 첫 번째 경로 추출

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* tablet 사이즈 부터 없어짐 */}
      <div className="tablet:hidden">
        {/* 햄버거 버튼 */}
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-mos-main-100 dark:focus:ring-gray-600"
          )}
          aria-controls="navbar-hamburger"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="size-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>

      {/* 오버레이 (사이드바 열렸을 때만 표시) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50"
          onClick={close}
        ></div>
      )}

      {/* 사이드바 */}
      <div
        className={cn(
          "sidebar fixed right-0 top-0 h-full w-64 bg-white text-black transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">
            <SvgIcons.Logo />
          </h2>
        </div>
        <ul className="mt-4 flex flex-col justify-between">
          <div>
            <li className="p-3 hover:bg-mos-main-100" onClick={close}>
              <Link href={URL.MYPAGE}>
                <Typography.P1 className="font-bold">
                  🏠 마이 페이지
                </Typography.P1>
              </Link>
            </li>
            <li className="p-3 hover:bg-mos-main-100" onClick={close}>
              <Link href={`${URL.STUDY.CREATE}?step=1`}>
                <Typography.P1 className="font-bold">
                  📄 스터디 만들기
                </Typography.P1>
              </Link>
            </li>
            {/* 스터디룸 메뉴 */}
            {isStudyRoom && (
              <>
                <Typography.P1 className="p-3 font-bold">
                  스터디 룸
                </Typography.P1>
                {MENU_ITEMS.map((item, index) => {
                  return (
                    <li
                      className="px-8 py-1.5 hover:bg-mos-main-100"
                      onClick={close}
                      key={`${item}_${index}`}
                    >
                      <Link href={item.path}>
                        <Typography.P1 className="flex gap-2 font-semibold">
                          <i className={cn(item.icon)} />
                          {item.name}
                        </Typography.P1>
                      </Link>
                    </li>
                  );
                })}
                <Typography.P1 className="p-3 font-bold">
                  스터디 룸 관리자
                </Typography.P1>

                {ADMIN_MENU_ITEMS.map((item, index) => {
                  return (
                    <li
                      className=" px-8 hover:bg-mos-main-100"
                      onClick={close}
                      key={`${item}_${index}`}
                    >
                      <Link href={item.path}>
                        <Typography.P1 className="flex gap-2 font-semibold">
                          <i className={cn(item.icon)} />
                          {item.name}
                        </Typography.P1>
                      </Link>
                    </li>
                  );
                })}
              </>
            )}

            {/* 추후 로그아웃 기능 들어갈지 미정 */}
            {/* <li className="p-3 hover:bg-mos-main-100" onClick={close}>
              <Link href={URL.STUDY.CREATE}>
                <Typography.P1 className="font-bold">⚙️ 설정</Typography.P1>
              </Link>
            </li> */}
          </div>
        </ul>
      </div>
    </>
  );
}

export default Header;
