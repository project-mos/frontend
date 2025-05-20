"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Badge from "@/shared/components/atoms/Badge";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Editor from "@/shared/components/atoms/Editor";
import CustomImage from "@/shared/components/atoms/Image";
import Input from "@/shared/components/atoms/Input";
import RadioButton from "@/shared/components/atoms/RadioButton";
import Select from "@/shared/components/atoms/Select";
import Skeleton from "@/shared/components/atoms/Skeleton";
import Tab from "@/shared/components/atoms/Tab";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";

import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import Calendar from "@/shared/components/molecules/Calendar";
import LabelInput from "@/shared/components/molecules/LabelInput";
import LabelInputDate from "@/shared/components/molecules/LabelInputDate";
import LabelNumberInput from "@/shared/components/molecules/LabelNumberInput";
import LabelSelectInput from "@/shared/components/molecules/LabelSelectInput";
import Meta from "@/shared/components/molecules/Meta";
import Pagination from "@/shared/components/molecules/Pagination";
import RadioGroup from "@/shared/components/molecules/RadioGroup";
import SkeletonCard from "@/shared/components/molecules/SkeletonCard";

// import StudyCard from "@/app/studies/components/StudyCard";
// import StudyDescriptionCard from "@/app/studies/components/StudyDescriptionCard";

import useModal from "@/shared/hooks/useModal";
// import {
//   MockStudiesApiResult,
//   MockStudyCardApiResult,
// } from "@/shared/mock/api/studies";
import LabelInputDateLocal from "@/shared/components/molecules/LabelDateTimeLocal";
import { useToast } from "@/shared/hooks/useToast";
import ToastRenderer from "@/shared/components/ToastRenderer";

interface FormData {
  test: string; // 'test' 필드 타입을 string으로 설정
}

export default function TestPage() {
  // const study = MockStudyCardApiResult.study;

  // input 에시용
  const methods = useForm<FormData>();
  const { watch } = methods;

  const [test] = watch(["test"]);

  const onSubmit = (data: FormData) => {
    console.log("data", data);
  };

  // Tab
  const [selectedTabState, setSelectedTabState] = useState<string>("");

  const [studyNameState, setStudyNameState] = useState<string>("");
  const [categoryState, setCategoryState] = useState<string>("");
  const categoryList = ["ex1", "ex2", "ex3"];
  const [startDateState, setStartDateState] = useState<string>("");
  const [endDateState, setEndDateState] = useState<string>("");

  const [studyMethodState, setStudyMethodState] = useState("online");
  const studyMethods = [
    { label: "비대면", value: "online" },
    { label: "대면", value: "offline" },
    { label: "혼합", value: "hybrid" },
  ];
  const toast = useToast();

  // modal
  const { isModalOpenState, openModal, closeModal } = useModal();

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
          <Button.Ghost color="Main">카테고리</Button.Ghost>
          <Button.Solid color="Main" active>
            전체
          </Button.Solid>
          <Button.Ghost
            color="Green"
            // className="border-2 border-mos-blue-500 bg-white"
          >
            <i className="bi bi-person-check text-[24px]"></i>
            출석하기
          </Button.Ghost>
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
      {/* <StudyCard data={study} /> */}
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
      {/* <StudyCard data={study} onClick={() => alert("click")} /> */}
      {/* StudyDescriptionCard */}
      {/* <StudyDescriptionCard data={MockStudiesApiResult} /> */}
      {/* Image */}
      <CustomImage
        src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
        alt="Next.js Logo"
        unoptimized
      />
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
            value={studyNameState}
            onChange={(e) => setStudyNameState(e.target.value)}
            required
          />
          <LabelInput
            name="duration"
            label="진행 시간"
            value={studyNameState}
            onChange={(e) => setStudyNameState(e.target.value)}
            placeholder="예: 매주 화요일 오후 8시"
          />
          <LabelSelectInput
            name="category"
            label="카테고리"
            selectList={categoryList}
            onChange={(e) =>
              setCategoryState((e.target as HTMLSelectElement).value)
            }
            required
          />
          <p>{categoryState}</p>

          <div className="flex w-full gap-3">
            <LabelInputDate
              name="startDate"
              label="모집 시작일"
              value={startDateState}
              onChange={(e) => setStartDateState(e.target.value)}
            />
            <LabelInputDate
              name="endDate"
              label="모집 마감일"
              value={endDateState}
              onChange={(e) => setEndDateState(e.target.value)}
            />
          </div>
          <p>{startDateState}</p>
          <p>{endDateState}</p>
          <LabelNumberInput name="person" label="모집 인원" />
          <LabelInputDateLocal name="asd" label="시작 시간" />
          <Editor name="test" />
        </form>
        <RadioButton label="test label" />
        <RadioGroup
          name="studyMethod"
          options={studyMethods}
          selectedValue={studyMethodState}
          onChange={(event) => {
            setStudyMethodState(event.target.value);
          }}
        />
      </FormProvider>
      {/* MDXEditor */}
      {/* Tab */}
      <Tab
        tabList={["잠여 중인 스터디", "지원 현황"]}
        selectedTab={selectedTabState}
        setSelectedTab={setSelectedTabState}
      />
      {/* Calendar */}
      <Calendar />
      {/* Skeleton */}
      <div className="flex w-48 flex-col items-center gap-5">
        <Skeleton className="max-w-40" />
        <Skeleton.Wrapper className="h-20 bg-gray-200" />
        <Skeleton.Linear />
        <Skeleton.Picture />
        <Skeleton.Video />
        <Skeleton.Profile />
        <SkeletonCard />
      </div>
      {/* 석재 확인 모달 */}
      <ActionConfirmModal
        type="danger"
        isOpen={isModalOpenState}
        onClose={closeModal}
        title="삭제 확인"
        content="정말로 삭제하시겠습니까?"
        buttonLabel="삭제"
      />
      <Button.Solid color="Main" active onClick={openModal}>
        삭제 확인 모달
      </Button.Solid>
      {/* 승인 확인 모달 */}
      {/* <ActionConfirmModal
        type="action"
        isOpen={modal}
        onClose={closeModal}
        title="숭인 확인"
        content="정말로 승인하시겠습니까?"
        buttonLabel="승인"
      />
      <Button.Solid color="Main" active onClick={openModal}>
        승인 확인 모달
      </Button.Solid> */}
      {/* toast */}
      <button
        onClick={() => {
          toast.success("성공했어!");
        }}
      >
        토스트 띄우기
      </button>
      {/* renderer로 전역상태 추가 */}
      <ToastRenderer />
    </div>
  );
}
