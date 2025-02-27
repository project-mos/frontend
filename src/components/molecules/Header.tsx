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
        className={`font-bold cursor-pointer text-mos-gray-500 ${className}`}
      >
        {label}
      </Typography.P1>
    </Link>
  );
};

const Header = () => {
  const isLoggedIn = false;

  return (
    <header className="w-full h-[55px] border-b border-gray-200 bg-white fixed top-0 left-0 laptop:px-[100px] desktop:px-[300] flex justify-between items-center">
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
      <div className="flex gap-[20px] items-center">
        <NavItem href="/my-page" label="마이페이지" />
        {isLoggedIn ? (
          <Button.Solid color="Main" active className="h-[29px]">
            로그아웃
          </Button.Solid>
        ) : (
          <Button.Solid color="Main" active className="h-[29px]">
            로그인
          </Button.Solid>
        )}
      </div>
    </header>
  );
};

export default Header;
