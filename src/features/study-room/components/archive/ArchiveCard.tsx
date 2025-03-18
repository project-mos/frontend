import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

import React from "react";

const ArchiveCard = () => {
  return (
    <Card className="col-span-12 h-fit gap-4 tablet:col-span-10">
      <Card.Header className="flex items-center justify-between">
        <Typography.SubTitle1>자료실</Typography.SubTitle1>
        <Button.Solid color="Main" active>
          <i className="bi bi-upload" />
          파일 업로드
        </Button.Solid>
      </Card.Header>
      <Card.Content>
        <table className="text-surface min-w-full text-left text-sm font-light">
          <thead className="border-b border-neutral-200 font-medium ">
            <tr>
              <th scope="col" className="px-1 py-2 text-[14px] tablet:text-sm">
                파일명
              </th>
              <th scope="col" className="px-1 py-2 text-[14px] tablet:text-sm">
                업로더
              </th>
              <th scope="col" className="px-1 py-2 text-[14px] tablet:text-sm">
                업로드 일자
              </th>
              <th scope="col" className="px-1 py-2 text-[14px] tablet:text-sm">
                크기
              </th>
              <th scope="col" className="px-1 py-2 text-[14px] tablet:text-sm">
                동작
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-200 dark:border-white/10">
              <td className="whitespace-nowrap px-1 py-2 font-medium">
                <div className="flex items-center gap-2">
                  <i className="bi bi-file-earmark-text"></i>
                  <Typography.P3 className=" text-[14px] tablet:text-sm">
                    알고리즘 로드맵.pdf
                  </Typography.P3>
                </div>
              </td>
              <td className="whitespace-nowrap px-1 py-2 ">
                <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
                  홍길동
                </Typography.P3>
              </td>
              <td className="whitespace-nowrap px-1 py-2">
                <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
                  2024-02-20
                </Typography.P3>
              </td>
              <td className="whitespace-nowrap px-1 py-2">
                <Typography.P3 className="text-[14px] font-medium tablet:text-sm">
                  1.2MB
                </Typography.P3>
              </td>
              <td className="whitespace-nowrap px-1 py-2">
                <Button.Icon color="Blue" className="font-bold">
                  <i className="bi bi-download"></i>
                  <Typography.P3 className="hidden tablet:block">
                    파일 다운로드
                  </Typography.P3>
                </Button.Icon>
              </td>
            </tr>
          </tbody>
        </table>
      </Card.Content>
    </Card>
  );
};

export default ArchiveCard;
