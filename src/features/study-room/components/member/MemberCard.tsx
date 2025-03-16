import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import Image from "next/image";
import React from "react";

const MemberCard = () => {
  return (
    <Card className="h-fit gap-3 overflow-x-scroll">
      <Card.Header>
        <Typography.SubTitle1>멤버 관리</Typography.SubTitle1>
      </Card.Header>
      <Card.Content className="gap-3">
        <table className="text-surface min-w-full text-left text-sm font-light">
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

export default MemberCard;
