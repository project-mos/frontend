import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import RadioButton from "@/components/atoms/RadioButton";
import Typography from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ToggleSwitchProps {
  isSubjective: boolean;
  setIsSubjective: React.Dispatch<React.SetStateAction<boolean>>;
}

interface QuestionProps {
  i: number;
}

const Option = () => {
  return (
    <div className="flex">
      <div className="flex h-[42px] w-[50px] items-center justify-center rounded-md rounded-r-none border border-gray-200">
        <i className="bi bi-record-circle"></i>
      </div>
      <Input
        className="w-full rounded-none placeholder:text-mos-gray-500"
        placeholder="옵션을 입력하세요"
      />
      <Button.Ghost
        type="button"
        color="Red"
        className="h-[42px] w-[50px] rounded-l-none bg-gray-100"
      >
        <i className="bi bi-trash text-mos-coral-500"></i>
      </Button.Ghost>
    </div>
  );
};

const OptionBox = () => {
  return (
    <div className="flex flex-col gap-[8px]">
      <Option />
      <Option />
      <Button.Ghost color="Main" className="bg-gray-100">
        <i className="bi bi-plus text-[20px]"></i>
        옵션 추가
      </Button.Ghost>
    </div>
  );
};

const ToggleSwitch = ({ isSubjective, setIsSubjective }: ToggleSwitchProps) => {
  const style =
    "border border-gray-300 px-[7px] py-[5px] cursor-pointer transition-all duration-100";

  const defaultStyle = "border-gray-300 text-gray-500";
  const hoverStyle =
    "hover:border-mos-main-500 hover:bg-white hover:text-mos-main-500";
  const activeStyle = "border-mos-main-500 bg-mos-main-500 text-white";

  return (
    <div className="flex">
      <div
        className={cn(
          style,
          isSubjective ? activeStyle : defaultStyle,
          !isSubjective && hoverStyle,
          "rounded-l-md"
        )}
        onClick={() => setIsSubjective(true)}
      >
        <Typography.P1 className="text-[14px]">주관식</Typography.P1>
      </div>

      <div
        className={cn(
          style,
          !isSubjective ? activeStyle : defaultStyle,
          isSubjective && hoverStyle,
          "rounded-r-md"
        )}
        onClick={() => setIsSubjective(false)}
      >
        <Typography.P1 className="text-[14px]">객관식</Typography.P1>
      </div>
    </div>
  );
};

const Question = ({ i }: QuestionProps) => {
  const [isSubjective, setIsSubjective] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-[12px] rounded-md border border-gray-100 bg-gray-100 p-4">
      <div className="flex justify-between">
        <Typography.Head3 className="text-mos-main-500">Q{i}</Typography.Head3>
        <Button.Ghost color="Red" type="button" className="bg-gray-100">
          <i className="bi bi-trash text-mos-coral-500"></i>
        </Button.Ghost>
      </div>
      <Input
        placeholder="질문을 입력하세요"
        className="w-full placeholder:text-mos-gray-500"
      />
      <div className="flex items-center gap-3">
        <RadioButton label="필수 답변" type="checkbox" />
        <ToggleSwitch
          isSubjective={isSubjective}
          setIsSubjective={setIsSubjective}
        />
      </div>
      {!isSubjective && <OptionBox />}
    </div>
  );
};

const StudyApply = () => {
  return (
    <Card className="pb-[30px]">
      <Card.Header className="mb-[30px] flex justify-between">
        <Typography.SubTitle1>지원서 양식</Typography.SubTitle1>
        <Button.Ghost color="Main" type="button">
          <i className="bi bi-plus text-[20px]"></i>
          질문 추가
        </Button.Ghost>
      </Card.Header>
      <Card.Content className="flex flex-col gap-[20px]">
        <Question i={1} />
        <Question i={2} />
      </Card.Content>
    </Card>
  );
};

export default StudyApply;
