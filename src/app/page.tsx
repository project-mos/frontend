import Button from "@/components/atoms/Button";
import Grid from "@/components/atoms/Grid";

import Select from "@/components/atoms/Select";
import Typography from "@/components/atoms/Typography";
import Pagination from "@/components/molecules/Pagination";
import StudyCard from "@/features/studies/components/StudyCard";
import { MockStudyCardApiResult } from "./mock/api/studies";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 border ">
      <div className="flex min-h-[325px] w-full border sm-mobile:flex-col ">
        <div className="box-border flex w-1/2 flex-col justify-around px-3">
          <div className="flex flex-col gap-2">
            <Typography.Head1 className="text-mos-main-500">
              함께 성장하는
            </Typography.Head1>
            <Typography.Head1>스터디 플랫폼</Typography.Head1>
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
        <div className="box-border w-1/2 px-3">
          <div className="box-border h-full  p-8">
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
      <div className="box-border flex size-full flex-col  gap-3 border  py-6">
        <div className="flex w-full flex-wrap items-center justify-center gap-2 ">
          <Button.Solid color="Main" active>
            전체
          </Button.Solid>
          <Button.Solid
            color="Main"
            className="hover:border-mos-main-500 hover:text-mos-main-500"
          >
            프로그래밍
          </Button.Solid>
          <Button.Solid
            className="hover:border-mos-main-500 hover:text-mos-main-500"
            color="Main"
          >
            어학
          </Button.Solid>
          <Button.Solid
            className="hover:border-mos-main-500 hover:text-mos-main-500"
            color="Main"
          >
            취업
          </Button.Solid>
          <Button.Solid
            className="hover:border-mos-main-500 hover:text-mos-main-500"
            color="Main"
          >
            자격증
          </Button.Solid>
          <Button.Solid
            className="hover:border-mos-main-500 hover:text-mos-main-500"
            color="Main"
          >
            독서
          </Button.Solid>
          <Button.Solid
            className="hover:border-mos-main-500 hover:text-mos-main-500"
            color="Main"
          >
            취미
          </Button.Solid>
          <Button.Solid
            className="hover:border-mos-main-500 hover:text-mos-main-500"
            color="Main"
          >
            고시/공무원
          </Button.Solid>
          <Button.Solid
            className="hover:border-mos-main-500 hover:text-mos-main-500"
            color="Main"
          >
            기타
          </Button.Solid>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-2 ">
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
      <div className="w-full border">
        <div className="mb-3 flex items-center gap-3">
          <i className="bi bi-star-fill text-3xl text-yellow-400"></i>
          <Typography.Head3>인기 스터디</Typography.Head3>
        </div>
        <Grid
          cols={2}
          gap={1}
          className="gap-y-4 mobile:grid-cols-3 tablet:grid-cols-4"
        >
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
          <div className="flex justify-center">
            <StudyCard
              className="hover:shadow-2xs transition hover:-translate-y-1 hover:border-mos-main-500 hover:shadow-mos-main-500 "
              study={MockStudyCardApiResult.study}
            />
          </div>
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
        </Grid>
      </div>
      <div className="flex flex-col gap-3 border">
        <div className="flex items-center gap-3">
          <Typography.Head3>전체 스터디</Typography.Head3>
        </div>
        <Grid
          cols={2}
          gap={1}
          className="gap-y-4 mobile:grid-cols-3 tablet:grid-cols-4"
        >
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
          <div className="flex justify-center">
            <StudyCard study={MockStudyCardApiResult.study} />
          </div>
        </Grid>
      </div>

      <div className="flex justify-center">
        <Pagination activePage={1} totalPage={2} />
      </div>
    </div>
  );
}
