"use client";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Select from "@/components/atoms/Select";
import Tag from "@/components/atoms/Tag";
import Typography from "@/components/atoms/Typography";
import Pagination from "@/components/molecules/Pagination";
import StudyCard from "@/features/studies/components/StudyCard";
import Meta from "@/components/molecules/Meta";
import StudyDescriptionCard from "@/features/studies/components/StudyDescriptionCard";
import {
  MockStudiesApiResult,
  MockStudyCardApiResult,
} from "../mock/api/studies";
import Badge from "@/components/atoms/Badge";
import CustomImage from "@/components/atoms/Image";
import Modal from "@/components/atoms/Modal";
import { useState } from "react";
import Input from "@/components/atoms/Input";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "@/features/create-study/components/LabelInput";
import LabelSelectInput from "@/features/create-study/components/LabelSelectInput";
import LabelTagInput from "@/features/create-study/components/LabelTagInput";
import LabelDateInput from "@/features/create-study/components/LabelDateInput";
import LabelNumberInput from "@/features/create-study/components/LabelNumberInput";
import RadioButton from "@/components/atoms/RadioButton";
import RadioGroup from "@/components/molecules/RadioGroup";
import Tab from "@/components/atoms/Tab";

import Calendar from "@/components/molecules/Calendar";

interface FormData {
  test: string; // 'test' 필드 타입을 string으로 설정
}

export default function TestPage() {
  const study = MockStudyCardApiResult.study;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  // input 에시용
  const methods = useForm<FormData>();
  const { watch } = methods;

  const [test] = watch(["test"]);

  const onSubmit = (data: FormData) => {
    console.log("data", data);
  };

  // Tab
  const [selectedTab, setSelectedTab] = useState<string>("");

  const [studyName, setStudyName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const categoryList = ["ex1", "ex2", "ex3"];
  const [tagList, setTagList] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [studyMethod, setStudyMethod] = useState("online");
  const studyMethods = [
    { label: "비대면", value: "online" },
    { label: "대면", value: "offline" },
    { label: "혼합", value: "hybrid" },
  ];
  return (
    <div className="border-10 flex min-h-screen flex-col items-center gap-5 border-red-500 bg-white text-black">
      {/* Typography */}
      <div className=" flex">
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
        <div className="flex items-center gap-1">
          <Tag.Default type="Detail">기본</Tag.Default>
          <Tag.Detail>#Python</Tag.Detail>
          <Tag.Default>안녕</Tag.Default>
          <Tag.Green border={false}>모집중</Tag.Green>
          <Tag.Gray border={false}>모집완료</Tag.Gray>
          <Tag.Blue>프로그래밍</Tag.Blue>
          <Tag.Pink>프로그래밍</Tag.Pink>
          <Tag.Default type="Card">#Python</Tag.Default>
          <Tag.Card>#Python</Tag.Card>
          <Tag.Main>알고리즘 기초</Tag.Main>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex items-center gap-2">
        <Typography.Head1>Buttons</Typography.Head1>
        <div className="flex items-center gap-1">
          <Button.Default>
            <i className="bi bi-heart"></i>
            좋아요 보기
          </Button.Default>
          <Button.Solid color="Main">카테고리</Button.Solid>
          <Button.Solid color="Main" active>
            전체
          </Button.Solid>
          <Button.Solid
            color="Green"
            // className="border-2 border-mos-blue-500 bg-white"
          >
            <i className="bi bi-person-check text-[24px]"></i>
            출석하기
          </Button.Solid>
          <Button.Icon color="Blue">
            <i className="bi bi-pencil"></i>
          </Button.Icon>
          <Button.Icon color="Red">
            <i className="bi bi-trash"></i>
          </Button.Icon>
        </div>
      </div>
      {/* Options */}
      <div className="flex items-center gap-2">
        <Typography.Head1>Options</Typography.Head1>
        <div className="flex items-center gap-1">
          <Select placeholder="진행 방식" defaultValue="">
            <Select.Option value={1}>1</Select.Option>
          </Select>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center gap-2">
        <Typography.Head1>Pagination</Typography.Head1>
        <div className="flex items-center gap-1">
          <Pagination activePage={1} totalPage={2} />
        </div>
      </div>
      <div>
        <i className="bi bi-0-circle"></i>
      </div>
      {/* Badge */}
      <div className="flex items-center gap-2">
        <Typography.Head1>Badge</Typography.Head1>
        <div className="flex items-center gap-1">
          <Badge>1/2 단계</Badge>
          <Badge color="Green">1/2 단계</Badge>
          <Badge color="Gray">
            <i className="bi bi-clock mr-1"></i>
            모집 기간: 2024-03-01 ~ 2024-03-04
          </Badge>
          <Badge color="Pink">1/2 단계</Badge>
          {/* <Badge color="Green">Green</Badge>
          <Badge color="Blue">Blue</Badge>
          <Badge color="Red">Red</Badge>
          <Badge color="Gray">Gray</Badge> */}
        </div>
      </div>
      <Card className="gap-3">
        <Card.Header>
          <Typography.Head3>알고리즘 마스터 스터디</Typography.Head3>
        </Card.Header>
        <Card.Content>
          <Typography.SubTitle1>Content</Typography.SubTitle1>
          <Typography.SubTitle1>스터디 소개</Typography.SubTitle1>
          <Typography.P1>
            코딩 테스트 대비를 위한 알고리즘 스터디입니다. 매주 백준 골드 레벨
            문제를 풀고 토론하며, 실전 대비 모의고사도 진행합니다.
          </Typography.P1>
        </Card.Content>
        <Card.Footer>
          <Typography.SubTitle1>Footer</Typography.SubTitle1>
          <Typography.P1>
            코딩 테스트 대비를 위한 알고리즘 스터디입니다. 매주 백준 골드 레벨
            문제를 풀고 토론하며, 실전 대비 모의고사도 진행합니다.
          </Typography.P1>
        </Card.Footer>
      </Card>
      {/* StudyCard */}
      <StudyCard study={study} />
      {/* Meta */}
      <div className="flex gap-2">
        <Meta icon="person" className="text-mos-main-500">
          4/6명
        </Meta>
        <Meta icon="calendar" onClick={() => alert("click")}>
          모집 기간: 2024-03-01 ~ 2024-03-04
        </Meta>
        l<Meta icon="clock">매주 화요일 저녁 8시</Meta>
        <Meta icon="eye">조회수 244</Meta>
      </div>
      {/* StudyCard */}
      <StudyCard study={study} onClick={() => alert("click")} />
      {/* StudyDescriptionCard */}
      <StudyDescriptionCard data={MockStudiesApiResult} />
      {/* Image */}
      <CustomImage
        src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
        alt="Next.js Logo"
        unoptimized
      />
      {/* modal */}
      <Button.Solid
        active
        color="Main"
        onClick={() => setIsOpenModal((prev) => !prev)}
      >
        모달열기
      </Button.Solid>
      {isOpenModal && (
        <Modal setIsOpenModal={setIsOpenModal}>
          <Modal.Content>
            <Typography.Head3>title</Typography.Head3>
            <Typography.P3>content</Typography.P3>
          </Modal.Content>
          <Modal.Button>
            <Button.Solid
              active
              color="Main"
              onClick={() => {
                alert("확인");
                setIsOpenModal(false);
              }}
            >
              확인
            </Button.Solid>
            <Button.Solid
              active
              color="Gray"
              onClick={() => setIsOpenModal(false)}
            >
              취소
            </Button.Solid>
          </Modal.Button>
        </Modal>
      )}

      {/* Input */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex gap-[10px]">
            <Input name="test"></Input>
            <Button.Solid color="Main" active={!!test} disabled={!test}>
              확인
            </Button.Solid>
          </div>
        </form>
      </FormProvider>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <LabelInput
            name="name"
            label="스터디명"
            value={studyName}
            onChange={(e) => setStudyName(e.target.value)}
            required
          />
          <LabelInput
            name="duration"
            label="진행 시간"
            value={studyName}
            onChange={(e) => setStudyName(e.target.value)}
            placeholder="예: 매주 화요일 오후 8시"
          />
          <LabelSelectInput
            label="카테고리"
            selectList={categoryList}
            onChange={(e) => setCategory((e.target as HTMLSelectElement).value)}
            required
          />
          <p>{category}</p>
          <LabelTagInput
            name="tags"
            tagList={tagList}
            setTagList={setTagList}
            label="태그"
          />
          <div className="flex w-full gap-3">
            <LabelDateInput
              name="startDate"
              label="모집 시작일"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <LabelDateInput
              name="endDate"
              label="모집 마감일"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <p>{startDate}</p>
          <p>{endDate}</p>
          <LabelNumberInput name="person" label="모집 인원" />
        </form>
        <RadioButton label="test label" />
        <RadioGroup
          name="studyMethod"
          options={studyMethods}
          selectedValue={studyMethod}
          onChange={setStudyMethod}
        />
      </FormProvider>
      {/* MDXEditor */}

      {/* Tab */}
      <Tab
        tabList={["잠여 중인 스터디", "지원 현황"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {/* Calendar */}
      <Calendar />
    </div>
  );
}
