import Card from "@/components/atoms/Card";
import React from "react";

const StudiesDashBoardPage = () => {
  return (
    <>
      <Card className="col-span-12">알고리즘 스터디</Card>
      <Card className="col-span-12 tablet:col-span-4">알고리즘 스터디</Card>
      <Card className="col-span-12 tablet:col-span-8">스터디 일정</Card>
      <Card className="col-span-12 tablet:col-span-4">관리자 메뉴</Card>
    </>
  );
};

export default StudiesDashBoardPage;
