"use client";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Tag from "@/components/atoms/Tag";
import Typography from "@/components/atoms/Typography";
import Pagination from "@/components/molecules/Pagination";

export default function TestPage() {
  return (
    <div className="flex flex-col gap-5 items-center border-10 border-red-500 bg-white text-black min-h-screen">
      {/* Typography */}
      <div className="flex">
        <Typography.Head1>Typographys &nbsp;</Typography.Head1>
        <div className="flex-col">
          <Typography.Head1>example Head1</Typography.Head1>
          <Typography.Head2>example Head2</Typography.Head2>
          <Typography.Head3>example Head3</Typography.Head3>
          <Typography.SubTitle1>example SubTitle1</Typography.SubTitle1>
          <Typography.P1>example P1</Typography.P1>
          <Typography.P2>example P2</Typography.P2>
          <Typography.P3 className="text-blue-500">example P3</Typography.P3>
        </div>
      </div>
      {/* Tags */}
      <div className="flex items-center gap-2">
        <Typography.Head1>Tags</Typography.Head1>
        <div className="flex gap-1 items-center">
          <Tag.Default type="Detail">기본</Tag.Default>
          <Tag.Detail>#Python</Tag.Detail>
          <Tag.Default>안녕</Tag.Default>
          <Tag.Green border={false}>모집중</Tag.Green>
          <Tag.Gray border={false}>모집완료</Tag.Gray>
          <Tag.Blue>프로그래밍</Tag.Blue>
          <Tag.Pink>프로그래밍</Tag.Pink>
          <Tag.Default type="Card">#Python</Tag.Default>
          <Tag.Card>#Python</Tag.Card>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex items-center gap-2">
        <Typography.Head1>Buttons</Typography.Head1>
        <div className="flex gap-1 items-center">
          <Button.Default>기본</Button.Default>
          <Button.Main>카테고리</Button.Main>
          <Button.Main active>선택 시</Button.Main>
        </div>
      </div>
      {/* Options */}
      <div className="flex items-center gap-2">
        <Typography.Head1>Options</Typography.Head1>
        <div className="flex gap-1 items-center">
          <Select placeholder="진행 방식" defaultValue="">
            <Select.Option value={1}>1</Select.Option>
          </Select>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center gap-2">
        <Typography.Head1>Pagination</Typography.Head1>
        <div className="flex gap-1 items-center">
          <Pagination activePage={1} totalPage={2} />
        </div>
      </div>
      <div>
        <i className="bi bi-0-circle"></i>
      </div>
    </div>
  );
}
