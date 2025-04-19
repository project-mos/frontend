"use client";
import cn from "@/shared/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";

import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

const ManageOverviewCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tap = Number(searchParams.get("tap") ?? "1");

  const tabs = [
    { id: 1, label: "규칙" },
    { id: 2, label: "혜택" },
  ];

  const onClickTab = (id: number) => {
    const newSearchParam = new URLSearchParams(searchParams);
    newSearchParam.set("tap", id.toString());
    router.push(`?${newSearchParam.toString()}`);
  };

  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
      <Card.Header className="mb-[10px] justify-between">
        <Typography.SubTitle1>스터디 안내 관리</Typography.SubTitle1>
      </Card.Header>
      <Card.Content>
        <div className="flex w-full border-b">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => onClickTab(tab.id)}
              className={cn(
                "w-[90px] cursor-pointer pb-3 text-center transition-all",
                tap === tab.id ? "border-b-2 border-mos-main font-semibold" : ""
              )}
            >
              <Typography.P1>{tab.label}</Typography.P1>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ManageOverviewCard;
