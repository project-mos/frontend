import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";

const StudyBanner = () => {
  return (
    <div className="flex min-h-[325px] w-full flex-col tablet:flex-row ">
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
  );
};

export default StudyBanner;
