import Pagination from "@/components/molecules/Pagination";

export default function Home() {
  return (
    <div className="flex h-screen flex-col border">
      <div className="h-[325px] w-full border">
        함께 성장하는 스터디 플랫폼 스터디를 찾고 있나요? <br /> StudyMos에서
        함께할 팀원을 만나보세요.
      </div>
      <div className="h-[95px] w-full border"></div>
      <div className="h-[420px] w-full border">인기 스터디</div>
      <div className="h-[1190px] w-full border">전체 스터디</div>
      <Pagination activePage={1} totalPage={2} />
    </div>
  );
}
