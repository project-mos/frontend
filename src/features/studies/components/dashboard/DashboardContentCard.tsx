import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import Image from "next/image";
import React from "react";

const DashboardContentCard = () => {
  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-10">
      {/* <DashboardScheduleContent /> */}
      <DashboardMemberContent />
    </Card>
  );
};

// const DashboardScheduleContent = () => {
//   return (
//     <>
//       <Card.Header className="flex-col justify-between gap-3">
//         <div className="flex justify-between">
//           <Typography.SubTitle1>스터디 일정</Typography.SubTitle1>
//           <Button.Solid color="Main" active>
//             <i className="bi bi-plus text-2xl" />
//             일정추가
//           </Button.Solid>
//         </div>
//       </Card.Header>
//       <Card.Content className="gap-3">
//         <DashboardSchedule />
//         <DashboardSchedule />
//       </Card.Content>
//     </>
//   );
// };
// const DashboardSchedule = () => {
//   return (
//     <Card className="gap-1 shadow-none">
//       <Card.Header className="justify-between">
//         <div className="flex gap-1">
//           <Badge color="Blue">
//             <i className="bi bi-calendar3 mr-1"></i>
//             2024-02-25
//           </Badge>
//           <Badge color="Gray">
//             <i className="bi bi-clock mr-1"></i>
//             20:00 - 22:00
//           </Badge>
//         </div>
//         <div className="flex gap-2">
//           <Button.Icon color="Blue">
//             <i className="bi bi-pencil"></i>
//           </Button.Icon>
//           <Button.Icon color="Red">
//             <i className="bi bi-trash"></i>
//           </Button.Icon>
//         </div>
//       </Card.Header>
//       <Card.Content>
//         <Typography.SubTitle1>알고리즘 기초 - 정렬</Typography.SubTitle1>
//       </Card.Content>
//       <Card.Footer>
//         <Typography.P3 className="text-mos-gray-300">
//           버블 정렬, 선택 정렬, 삽입 정렬에 대해 학습합니다.
//         </Typography.P3>
//       </Card.Footer>
//     </Card>
//   );
// };

const DashboardMemberContent = () => {
  return (
    <>
      <Card.Header className="flex-col justify-between gap-3">
        {/* <div className="flex justify-between">
          <Typography.SubTitle1>멤버</Typography.SubTitle1>
        </div> */}
      </Card.Header>
      <Card.Content className="gap-3">
        <DashboardMember />
        <DashboardMemberAttendance />
      </Card.Content>
    </>
  );
};

const DashboardMember = () => {
  return (
    <Card className="gap-3 overflow-x-scroll shadow-none">
      <Card.Header>
        <Typography.SubTitle1>멤버 관리</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="gap-3">
        <table className="text-surface min-w-full text-left text-sm font-light dark:text-white">
          <thead className="border-b border-neutral-200 font-medium ">
            <tr>
              <th scope="col" className="px-1 py-2 text-[14px]">
                이름
              </th>
              <th scope="col" className="px-1 py-2 text-[14px]">
                역할
              </th>
              <th scope="col" className="px-1 py-2 text-[14px]">
                참여일
              </th>
              <th scope="col" className="px-1 py-2 text-[14px]">
                참여율
              </th>
              <th scope="col" className="px-1 py-2 text-[14px]">
                동작
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-200 dark:border-white/10">
              <td className="whitespace-nowrap px-1 py-2 font-medium">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/"}
                    fill={false}
                    width={30}
                    height={30}
                    alt="멤버 이미지"
                    className="hidden !h-[30px] w-[30px] rounded-full bg-slate-500"
                  ></Image>
                  <Typography.P3 className=" text-[14px] tablet:text-sm">
                    홍길동
                  </Typography.P3>
                </div>
              </td>
              <td className="whitespace-nowrap px-1 py-2 ">
                <Badge className="w-fit" color="Green">
                  <span className=" text-[11px] tablet:text-sm">스터디장</span>
                </Badge>
              </td>
              <td className="whitespace-nowrap px-1 py-2">
                <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
                  2024-02-20
                </Typography.P3>
              </td>
              <td className="whitespace-nowrap px-1 py-2">
                <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
                  50%
                </Typography.P3>
              </td>
              <td className="whitespace-nowrap px-1 py-2">
                <Button.Icon color="Blue">
                  <i className="bi bi-chat"></i>
                </Button.Icon>
              </td>
            </tr>
          </tbody>
        </table>
      </Card.Content>
    </Card>
  );
};
const DashboardMemberAttendance = () => {
  return (
    <Card className="gap-3 shadow-none">
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
              {/* tablet 이상 */}
              <div className="flex h-full items-center">
                <i className="bi bi-calendar3 mr-1 hidden tablet:inline-block"></i>
                <div className="flex flex-col text-[12px] tablet:flex-row tablet:gap-2 tablet:text-sm">
                  <span>2024-02-25</span>
                  <span>20:00</span>
                </div>
              </div>
            </div>
            <div className="box-border h-14 border-b-2 p-4">
              {/* <div className="flex gap-1 items-center">
                <Badge className="w-fit" color="Blue">
                  <i className="bi bi-calendar3 mr-1"></i>
                  2024-02-25
                </Badge>
                <Badge className="w-fit" color="Gray">
                  <i className="bi bi-clock mr-1"></i>
                  20:00
                </Badge>
              </div> */}
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
            {/* <div className="flex    min-w-[90px] tablet:min-w-[145px]  flex-col text-center">
              <div className="box-border p-4 border-b-2 h-14">
                <Typography.P3 className="font-bold">강민재</Typography.P3>
              </div>
              <div className="box-border p-4 border-b-2 h-14">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border p-4 border-b-2 h-14">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border p-4 border-b-2 h-14">
                <Typography.P3 className="font-semibold">100%</Typography.P3>
              </div>
            </div> */}
            {/* <div className="flex    min-w-[90px] tablet:min-w-[145px]  flex-col text-center">
              <div className="box-border p-4 border-b-2 h-14">
                <Typography.P3 className="font-bold">강민재</Typography.P3>
              </div>
              <div className="box-border p-4 border-b-2 h-14">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border p-4 border-b-2 h-14">
                <i className="bi bi-check-circle text-mos-main-500"></i>
              </div>
              <div className="box-border p-4 border-b-2 h-14">
                <Typography.P3 className="font-semibold">100%</Typography.P3>
              </div>
            </div> */}
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

{
  /* <table className="relative min-w-full text-left text-sm font-light text-surface dark:text-white scroll">
  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
    <tr>
      <th scope="col" className="px-1 py-2">
        시간
      </th>
      <th scope="col" className="py-2">
        홍길동
      </th>
      <th scope="col" className="py-2">
        김철수
      </th>
      <th scope="col" className="py-2">
        이영희
      </th>
      <th scope="col" className="py-2">
        이영희
      </th>
      <th scope="col" className="absolute right-1 px-1 py-2 bg-gray-200">
        수업 출석율
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-neutral-200 dark:border-white/10">
      <td className="whitespace-nowrap px-1 py-2 font-medium">
        <div className="flex gap-1 items-center max-w-20">
          <Badge className="w-fit" color="Blue">
            <i className="bi bi-calendar3 mr-1"></i>
            2024-02-25
          </Badge>
          <Badge className="w-fit" color="Gray">
            <i className="bi bi-clock mr-1"></i>
            20:00
          </Badge>
        </div>
      </td>
      <td className="whitespace-nowrap py-2">
        <i className="bi bi-check-circle text-mos-main-500"></i>
      </td>
      <td className="whitespace-nowrap py-2">
        <i className="bi bi-check-circle text-mos-main-500"></i>
      </td>
      <td className="whitespace-nowrap py-2">
        <i className="bi bi-check-circle text-mos-main-500"></i>
      </td>
      <td className="whitespace-nowrap px-1 py-2 absolute right-1">
        <Typography.P3 className="font-medium">100%</Typography.P3>
      </td>
    </tr>
    <tr className="border-b border-neutral-200 dark:border-white/10">
      <td className="whitespace-nowrap px-1 py-2 font-medium">
        <div className="flex gap-1 items-center max-w-20">
          <Badge className="w-fit" color="Blue">
            <i className="bi bi-calendar3 mr-1"></i>
            2024-02-26
          </Badge>
          <Badge className="w-fit" color="Gray">
            <i className="bi bi-clock mr-1"></i>
            20:00
          </Badge>
        </div>
      </td>
      <td className="whitespace-nowrap py-2">
        <i className="bi bi-check-circle text-mos-main-500"></i>
      </td>
      <td className="whitespace-nowrap py-2">
        <i className="bi bi-dash-circle text-mos-gray-500"></i>
      </td>
      <td className="whitespace-nowrap py-2">
        <i className="bi bi-check-circle text-mos-main-500"></i>
      </td>
      <td className="whitespace-nowrap px-1 py-2 absolute right-1">
        <Typography.P3 className="font-medium">66%</Typography.P3>
      </td>
    </tr>
    {/* 출석 합계 */
}
//     <tr className="border-b border-neutral-200 dark:border-white/10">
//       <td className="whitespace-nowrap px-1 py-2 font-bold">
//         <Typography.P3>개인 출석율</Typography.P3>
//       </td>
//       <td className="whitespace-nowrap py-2">
//         <Typography.P3 className="font-medium">100%</Typography.P3>
//       </td>
//       <td className="whitespace-nowrap py-2">
//         <Typography.P3 className="font-medium">50%</Typography.P3>
//       </td>
//       <td className="whitespace-nowrap py-2">
//         <Typography.P3 className="font-medium">100%</Typography.P3>
//       </td>
//       <td className="whitespace-nowrap px-1 py-2">
//         <Typography.P3 className="font-medium">100%</Typography.P3>
//       </td>
//     </tr>
//   </tbody>
// </table>; */}

export default DashboardContentCard;
