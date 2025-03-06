import Button from "@/components/atoms/Button";

import Select from "@/components/atoms/Select";
import Pagination from "@/components/molecules/Pagination";

export default function Home() {
  return (
    <div className="flex h-screen flex-col border ">
      <div className="flex min-h-[325px] w-full border sm-mobile:flex-col ">
        <div className="box-border h-full w-1/2 bg-slate-400 px-3 ">
          <div>
            함께 성장하는
            <br /> 스터디 플랫폼
          </div>
          <div>
            스터디를 찾고 있나요? <br /> StudyMos에서 함께할 팀원을 만나보세요.
          </div>
          <div>
            <Button.Default>스터디 만들기</Button.Default>
          </div>
        </div>
        <div className="box-border w-1/2 px-3">
          <div className="box-border h-full bg-slate-400 p-8">
            <div className="relative size-full rounded-lg bg-red-400">
              <div className="absolute bottom-0 right-0 box-border flex h-20 w-48 translate-x-[20px] translate-y-[20px] gap-2 rounded-lg bg-fuchsia-200 p-4">
                <div className="flex items-center bg-slate-600">
                  <i className="bi bi-heart"></i>
                </div>
                <div className="">
                  <div>현재 진행중인 스터디</div>
                  <div>1,234개</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-border flex w-full flex-col  gap-3 border bg-slate-400 py-6">
        <div className="flex w-full items-center justify-center gap-2">
          <Button.Solid color="Main" active>
            전체
          </Button.Solid>
          <Button.Solid color="Main">프로그래밍</Button.Solid>
          <Button.Solid color="Main">어학</Button.Solid>
          <Button.Solid color="Main">취업</Button.Solid>
          <Button.Solid color="Main">자격증</Button.Solid>
          <Button.Solid color="Main">독서</Button.Solid>
          <Button.Solid color="Main">취미</Button.Solid>
          <Button.Solid color="Main">고시/공무원</Button.Solid>
          <Button.Solid color="Main">기타</Button.Solid>
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <Select placeholder="진행 방식" defaultValue="">
            <Select.Option value={1}>1</Select.Option>
          </Select>
          <Select placeholder="진행 방식" defaultValue="">
            <Select.Option value={1}>1</Select.Option>
          </Select>
          <Button.Default>
            <i className="bi bi-heart"></i>
            좋아요 보기
          </Button.Default>
          {/* <Input name="" /> */}
        </div>
      </div>
      <div className="h-[420px] w-full border">인기 스터디</div>
      <div className="h-[1190px] w-full border">전체 스터디</div>
      <Pagination activePage={1} totalPage={2} />
    </div>
  );
}
