"use client";
import cn from "@/shared/utils/cn";

import Button, { SolidButtonProps } from "@/shared/components/atoms/Button";
import Select from "@/shared/components/atoms/Select";
import Typography from "@/shared/components/atoms/Typography";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GetCategories } from "@/shared/types/api/studies";

// const categories = [
//   { label: "전체", value: null }, // 전체는 필터 없이 사용
//   { label: "프로그래밍", value: "프로그래밍" },
//   { label: "어학", value: "어학" },
//   // { label: "취업", value: "취업" },
//   { label: "자격증", value: "자격증" },
//   { label: "독서", value: "독서" },
//   { label: "취미", value: "취미" },
//   // { label: "고시/공무원", value: "고시/공무원" },
//   // { label: "기타", value: "기타" },
// ];

const meetingTypes = [
  { label: "전체", value: null },
  { label: "대면", value: "대면" },
  { label: "비대면", value: "비대면" },
  { label: "혼합", value: "혼합" },
];

const recruitmentOptions = [
  { label: "전체", value: null },
  { label: "모집 중", value: "모집 중" },
  { label: "모집 완료", value: "모집 완료" },
];

type Categories = GetCategories["categories"][number] | "전체";

type LandingCategories = Record<"label" | "value", Categories | null>[];
interface LandingContentHeaderProps {
  categories: GetCategories;
}

const LandingContentHeader = ({ categories }: LandingContentHeaderProps) => {
  const { categories: categoriesData } = categories;
  // label, value 방식으로 변환(임시적용일 수 있음)
  const makeLabelCategoriesData: LandingCategories = categoriesData.map(
    (item) => {
      return { value: item, label: item };
    }
  );
  if (makeLabelCategoriesData) {
    makeLabelCategoriesData.unshift({ label: "전체", value: null });
  }

  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();

  const onClickCategory = (value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString());

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const onClickLiked = () => {
    const params = new URLSearchParams(currentSearchParams.toString());
    const liked = currentSearchParams.get("liked");
    const boolValue = liked === "true";

    if (liked === null) {
      params.set("liked", `${true}`);
    } else {
      params.set("liked", `${!boolValue}`);
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  const onSelected = (type: "meet" | "recruitment", value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString());

    if (type === "meet") {
      if (value) {
        params.set("meetType", value);
      } else {
        params.delete("meetType");
      }
    } else {
      if (value) {
        params.set("recruitmentStatus", value);
      } else {
        params.delete("recruitmentStatus");
      }
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  // const { data, isLoading } = useStudies(
  //   { page: "1" },
  //   { staleTime: 1000 * 60 * 5 }
  // );
  // const { data, isLoading } = useHotStudies({
  //   staleTime: 1000 * 60 * 5,
  // });

  return (
    <div>
      {/* Banner */}
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
      <div className="box-border flex size-full flex-col  gap-3   py-6">
        {/* Buttons */}
        <div className="flex w-full flex-wrap items-center justify-center gap-2 ">
          {makeLabelCategoriesData.map(({ label, value }) => (
            <LandingHeaderButton
              key={value || "all"}
              color="Main"
              active={currentSearchParams.get("category") === value}
              onClick={() => onClickCategory(value || "")}
            >
              {label}
            </LandingHeaderButton>
          ))}
        </div>
        {/* Selects */}
        <div className="flex w-full flex-wrap items-center justify-center gap-2 ">
          <Select
            placeholder="진행 방식"
            defaultValue={currentSearchParams.get("meetType") || ""}
            className="text-mos-gray-500"
            onChange={(event) => onSelected("meet", event.currentTarget.value)}
          >
            {meetingTypes.map(({ label, value }) => {
              return (
                <Select.Option key={value} value={value || ""}>
                  {label}
                </Select.Option>
              );
            })}
          </Select>
          <Select
            placeholder="모집 방식"
            className="text-mos-gray-500"
            defaultValue={currentSearchParams.get("recruitmentStatus") || ""}
            onChange={(event) =>
              onSelected("recruitment", event.currentTarget.value)
            }
          >
            {recruitmentOptions.map(({ label, value }) => {
              return (
                <Select.Option key={value} value={value || ""}>
                  {label}
                </Select.Option>
              );
            })}
          </Select>
          <Button.Ghost
            color="Main"
            className=" hover:border-mos-main-500 hover:text-mos-main-500"
            active={currentSearchParams.get("liked") === "true"}
            onClick={onClickLiked}
          >
            <i className="bi bi-heart" />
            좋아요 보기
          </Button.Ghost>
        </div>
      </div>
    </div>
  );
};

export default LandingContentHeader;

const LandingHeaderButton = ({
  children,
  className,
  ...props
}: SolidButtonProps) => {
  return (
    <Button.Ghost
      className={cn(
        "hover:border-mos-main-500 hover:text-mos-main-500",
        className
      )}
      {...props}
    >
      {children}
    </Button.Ghost>
  );
};
