import SvgIcons from "@/app/asset/icon/SvgIcons";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import Typography from "../atoms/Typography";

interface NavItemProps {
  href: string;
  label: string;
  className?: string;
}

const NavItem = ({ href, label, className }: NavItemProps) => {
  return (
    <Link href={href} passHref>
      <Typography.P1
        className={`font-bold text-[18px] cursor-pointer text-mos-gray-700 ${className}`}
      >
        {label}
      </Typography.P1>
    </Link>
  );
};

const Header = () => {
  const isLoggedIn = false;

  return (
    <header className="w-full h-[75px] border-b border-gray-200 bg-white fixed top-0 left-0 px-[100px] flex justify-between items-center">
      {/* 왼쪽: 로고 */}
      <div>
        <Link href="/" passHref>
          <SvgIcons.Logo />
        </Link>
      </div>

      {/* 중간: 스터디 만들기 버튼 */}
      <div>
        <NavItem href="/create-study" label="스터디 만들기" />
      </div>

      {/* 오른쪽: 마이페이지, 로그인 버튼 */}
      <div className="flex gap-[40px] items-center">
        <NavItem href="/my-page" label="마이페이지" />
        {isLoggedIn ? (
          <Button.Solid color="Main" active className="h-[35px]">
            로그아웃
          </Button.Solid>
        ) : (
          <Button.Solid color="Main" active className="h-[35px]">
            로그인
          </Button.Solid>
        )}
      </div>
    </header>
  );
};

export default Header;
