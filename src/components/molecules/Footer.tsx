import SvgIcons from "@/app/asset/icon/SvgIcons";
import Typography from "../atoms/Typography";

const footerSections = [
  {
    title: "서비스",
    list: ["스터디 찾기", "스터디 만들기", "마이페이지"],
  },
  {
    title: "카테고리",
    list: ["프로그래밍", "어학", "취업", "전체보기"],
  },
  {
    title: "고객지원",
    list: ["공지사항", "자주 묻는 질문", "문의하기"],
  },
  {
    title: "정책",
    list: ["이용약관", "개인정보처리방침", "환불정책"],
  },
];

interface FooterProps {
  className?: string;
  children: string;
}

const Text: React.FC<FooterProps> = ({ children, className = "" }) => (
  <Typography.P1 className={`text-nowrap text-mos-gray-300 ${className}`}>
    {children}
  </Typography.P1>
);

const Footer = () => {
  return (
    <div className="h-auto w-full bg-mos-white-gray-100 py-[56px]">
      <div className="mx-auto w-[90%] max-w-[1300px]">
        <div className="mb-[50px] flex flex-wrap justify-between gap-[50px]">
          <div className="flex flex-col gap-2">
            <SvgIcons.Logo />
            <Text>함께 성장하는 스터디 플랫폼</Text>
            <div className="flex gap-[15px]">
              <i className="bi bi-github text-mos-gray-300"></i>
              <i className="bi bi-instagram text-mos-gray-300"></i>
              <i className="bi bi-facebook text-mos-gray-300"></i>
            </div>
          </div>
          <div className="flex flex-wrap gap-[120px]">
            {footerSections.map(({ title, list }) => (
              <div key={title}>
                <Text className="mb-[10px] font-bold">{title}</Text>
                {list.map((list) => (
                  <Text key={list}>{list}</Text>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border-b border-gray-300"></div>
        <div className="mt-[30px] flex flex-wrap justify-between gap-[20px]">
          <Text>@2025 StudyMos. All rights reserved.</Text>
          <Text>사업자등록번호: 123-45-67890 | 대표: 홍길동</Text>
        </div>
      </div>
    </div>
  );
};

export default Footer;
