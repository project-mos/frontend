import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

const MemberAttendanceCard = () => {
  return (
    <Card className="gap-3">
      <Card.Header>
        <Typography.SubTitle1>출석 현황</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="gap-3">
        <div className="flex">
          {/* 시간 */}
          <div className="flex  min-w-[80px] flex-col tablet:min-w-[200px]">
            <div className="box-border h-14 border-b-2 p-4">
              <Typography.P3 className="font-bold">시간</Typography.P3>
            </div>
            <div className="box-border h-14 border-b-2 p-4 ">
              <div className="flex h-full items-center">
                <i className="bi bi-calendar3 mr-1 hidden tablet:inline-block"></i>
                <div className="flex flex-col text-[12px] tablet:flex-row tablet:gap-2 tablet:text-sm">
                  <span>2024-02-25</span>
                  <span>20:00</span>
                </div>
              </div>
            </div>
            <div className="box-border h-14 border-b-2 p-4">
              <div className="flex h-full items-center">
                <i className="bi bi-calendar3 mr-1 hidden tablet:inline-block"></i>
                <div className="flex flex-col text-[12px] tablet:flex-row tablet:gap-2 tablet:text-sm">
                  <span>2024-02-26</span>
                  <span>20:00</span>
                </div>
              </div>
            </div>
            <div className="box-border flex h-14 flex-col justify-center border-b-2 p-4 tablet:flex-row tablet:justify-start tablet:gap-1">
              <Typography.P3 className="font-bold">개인</Typography.P3>
              <Typography.P3 className="font-bold">출석율</Typography.P3>
            </div>
          </div>
          {/* 멤버 */}
          <div className="flex w-full overflow-x-scroll">
            <div className="flex    min-w-[90px] flex-col  text-center tablet:min-w-[145px]">
              <div className="box-border h-14 border-b-2 p-4">
                <Typography.P3 className="font-bold">강민재</Typography.P3>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <Typography.P3 className="font-semibold">100%</Typography.P3>
              </div>
            </div>
            <div className="flex    min-w-[90px] flex-col  text-center tablet:min-w-[145px]">
              <div className="box-border h-14 border-b-2 p-4">
                <Typography.P3 className="font-bold">강민재</Typography.P3>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <Typography.P3 className="font-semibold">100%</Typography.P3>
              </div>
            </div>
            <div className="flex    min-w-[90px] flex-col  text-center tablet:min-w-[145px]">
              <div className="box-border h-14 border-b-2 p-4">
                <Typography.P3 className="font-bold">강민재</Typography.P3>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <Typography.P3 className="font-semibold">100%</Typography.P3>
              </div>
            </div>
            <div className="flex    min-w-[90px] flex-col  text-center tablet:min-w-[145px]">
              <div className="box-border h-14 border-b-2 p-4">
                <Typography.P3 className="font-bold">강민재</Typography.P3>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <Typography.P3 className="font-semibold">100%</Typography.P3>
              </div>
            </div>
            <div className="flex    min-w-[90px] flex-col  text-center tablet:min-w-[145px]">
              <div className="box-border h-14 border-b-2 p-4">
                <Typography.P3 className="font-bold">강민재</Typography.P3>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border h-14 border-b-2 p-4">
                <Typography.P3 className="font-semibold">100%</Typography.P3>
              </div>
            </div>
          </div>

          {/* 수업 출석율 */}
          <div className="flex min-w-[80px] flex-col text-center shadow-[-14px_0_5px_-4px_rgba(128,128,128,0.1)] tablet:min-w-[120px] ">
            <div className="box-border flex h-14 flex-col justify-center border-b-2 p-4 tablet:flex-row tablet:gap-1">
              <Typography.P3 className="font-bold">수업</Typography.P3>
              <Typography.P3 className="font-bold">출석율</Typography.P3>
            </div>
            <div className="box-border h-14 border-b-2 p-4">
              <Typography.P3 className="font-bold">100%</Typography.P3>
            </div>
            <div className="box-border h-14 border-b-2 p-4">
              <Typography.P3 className="font-bold">100%</Typography.P3>
            </div>
            <div className="box-border h-14 border-b-2 p-4">
              {/* <Typography.P3 className="font-bold">100%</Typography.P3> */}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default MemberAttendanceCard;
