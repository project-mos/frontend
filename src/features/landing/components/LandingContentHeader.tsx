import Button, { SolidButtonProps } from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Typography from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import React from "react";

const LandingContentHeader = () => {
  return (
    <div>
      <div className="flex min-h-[325px] w-full flex-col border tablet:flex-row ">
        <div className="box-border flex w-full flex-col justify-center gap-5 px-3 tablet:w-1/2 tablet:gap-5 ">
          <div className="flex flex-col gap-2">
            <Typography.Head1 className="font-semibold text-mos-main-500 ">
              함께 성장하는
            </Typography.Head1>
            <Typography.Head1 className="font-semibold">
              스터디 플랫폼
            </Typography.Head1>
          </div>
          <div>
            <Typography.P1 className="text-xl font-thin text-mos-gray-700">
              스터디를 찾고 있나요?
            </Typography.P1>
            <Typography.P1 className="text-xl font-thin text-mos-gray-700">
              StudyMos에서 함께할 팀원을 만나보세요.
            </Typography.P1>
          </div>
          <div>
            <Button.Default className="h-12 px-8 py-4 text-xl text-mos-gray-700 shadow-sm  hover:-translate-y-1  hover:border-mos-main-500 hover:bg-mos-main-500 hover:text-white">
              스터디 만들기
            </Button.Default>
          </div>
        </div>
        <div className="box-border h-[365px] w-full px-3 mobile:h-[430px] tablet:w-1/2">
          <div className="box-border h-full  p-8">
            <div className="relative size-full rounded-xl bg-slate-400">
              <div className="absolute bottom-0 right-0 box-border flex h-20 w-48 translate-x-[20px] translate-y-[25px] gap-2 rounded-xl border border-mos-gray-100 bg-white p-4">
                <div className="flex h-10 w-7 items-center justify-center rounded-[50%] bg-mos-blue-300">
                  <i className="bi bi-people text-mos-blue-700"></i>
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px]">현재 진행중인 스터디</p>
                  <p className="font-bold">1,234개</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box-border flex size-full flex-col  gap-3 border  py-6">
        <div className="flex w-full flex-wrap items-center justify-center gap-2 ">
          <LandingHeaderButton color="Main" active>
            전체
          </LandingHeaderButton>
          <LandingHeaderButton color="Main">프로그래밍</LandingHeaderButton>
          <LandingHeaderButton color="Main">어학</LandingHeaderButton>
          <LandingHeaderButton color="Main">취업</LandingHeaderButton>
          <LandingHeaderButton color="Main">자격증</LandingHeaderButton>
          <LandingHeaderButton color="Main">독서</LandingHeaderButton>
          <LandingHeaderButton color="Main">취미</LandingHeaderButton>
          <LandingHeaderButton color="Main">고시/공무원</LandingHeaderButton>
          <LandingHeaderButton color="Main">기타</LandingHeaderButton>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-2 ">
          <Select
            placeholder="진행 방식"
            defaultValue=""
            className="text-mos-gray-500"
          >
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
    </div>
  );
};

export default LandingContentHeader;

const LandingHeaderButton = ({
  children,
  className,
  ...props
}: SolidButtonProps) => {
  return (
    <Button.Solid
      className={cn(
        "hover:border-mos-main-500 hover:text-mos-main-500",
        className
      )}
      {...props}
    >
      {children}
    </Button.Solid>
  );
};
