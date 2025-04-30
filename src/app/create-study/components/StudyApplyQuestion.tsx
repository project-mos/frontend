import { useFormContext } from "react-hook-form";

import cn from "@/shared/utils/cn";

import Button from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";
import RadioButton from "@/shared/components/atoms/RadioButton";
import Typography from "@/shared/components/atoms/Typography";

interface QuestionProps {
  i: number;
  index: number;
  onRemove: () => void;
}

interface ToggleSwitchProps {
  index: number;
}

const ToggleSwitch = ({ index }: ToggleSwitchProps) => {
  const { watch, setValue } = useFormContext();
  const type = watch(`applicationQuestions.${index}.type`) || "주관식";

  const defaultStyle = "border border-gray-300 text-gray-500";
  const hoverStyle =
    "hover:border-mos-main-500 hover:bg-white hover:text-mos-main-500";
  const activeStyle = "border-mos-main-500 bg-mos-main-500 text-white";

  return (
    <div className="flex">
      <div
        className={cn(
          "cursor-pointer rounded-l-md px-[7px] py-[5px] transition-all duration-100",
          type === "주관식" ? activeStyle : defaultStyle,
          type !== "주관식" && hoverStyle
        )}
        onClick={() => {
          setValue(`applicationQuestions.${index}.type`, "주관식");
          setValue(`applicationQuestions.${index}.options`, []);
        }}
      >
        <Typography.P1 className="text-[14px]">주관식</Typography.P1>
      </div>

      <div
        className={cn(
          "cursor-pointer rounded-r-md px-[7px] py-[5px] transition-all duration-100",
          type === "객관식" ? activeStyle : defaultStyle,
          type !== "객관식" && hoverStyle
        )}
        onClick={() => {
          setValue(`applicationQuestions.${index}.type`, "객관식");
        }}
      >
        <Typography.P1 className="text-[14px]">객관식</Typography.P1>
      </div>
    </div>
  );
};

const Option = ({
  index,
  optionIndex,
}: {
  index: number;
  optionIndex: number;
}) => {
  const { watch, setValue } = useFormContext();
  const options = watch(`applicationQuestions.${index}.options`) || [];

  const handleRemoveOption = () => {
    setValue(
      `applicationQuestions.${index}.options`,
      options.filter((_: string, i: number) => i !== optionIndex)
    );
  };

  return (
    <div className="flex">
      <div className="flex h-[42px] w-[50px] items-center justify-center rounded-md rounded-r-none border border-gray-200">
        <i className="bi bi-record-circle"></i>
      </div>
      <Input
        className="h-[42px] w-full rounded-none placeholder:text-mos-gray-500"
        placeholder="옵션을 입력하세요"
        value={options[optionIndex]}
        onChange={(e) => {
          const newOptions = [...options];
          newOptions[optionIndex] = e.target.value;
          setValue(`applicationQuestions.${index}.options`, newOptions);
        }}
      />
      <Button.Ghost
        type="button"
        color="Red"
        className="h-[42px] w-[50px] rounded-l-none bg-gray-100"
        onClick={handleRemoveOption}
      >
        <i className="bi bi-trash text-mos-coral-500"></i>
      </Button.Ghost>
    </div>
  );
};

const OptionBox = ({ index }: { index: number }) => {
  const { watch, setValue } = useFormContext();
  const options = watch(`applicationQuestions.${index}.options`) || [];

  const handleAddOption = () => {
    setValue(`applicationQuestions.${index}.options`, [...options, ""]);
  };

  return (
    <div className="flex flex-col gap-[8px]">
      {options.map((_: string, optionIndex: number) => (
        <Option key={optionIndex} index={index} optionIndex={optionIndex} />
      ))}
      <Button.Ghost
        onClick={handleAddOption}
        color="Main"
        className="bg-gray-100"
        type="button"
      >
        <i className="bi bi-plus text-[20px]"></i>
        옵션 추가
      </Button.Ghost>
    </div>
  );
};

const StudyApplyQuestion = ({ i, index, onRemove }: QuestionProps) => {
  const { register, watch } = useFormContext();
  const type = watch(`applicationQuestions.${index}.type`);

  return (
    <div className="flex flex-col gap-[12px] rounded-md border border-gray-100 bg-gray-100 p-4">
      <div className="flex justify-between">
        <Typography.Head3 className="text-mos-main-500">Q{i}</Typography.Head3>
        <Button.Ghost
          color="Red"
          type="button"
          onClick={onRemove}
          className="bg-gray-100"
        >
          <i className="bi bi-trash text-mos-coral-500"></i>
        </Button.Ghost>
      </div>
      <Input
        placeholder="질문을 입력하세요"
        className="w-full placeholder:text-mos-gray-500"
        {...register(`applicationQuestions.${index}.question`)}
      />
      <div className="flex items-center gap-3">
        <RadioButton
          label="필수 답변"
          type="checkbox"
          {...register(`applicationQuestions.${index}.required`)}
        />
        <ToggleSwitch index={index} />
      </div>
      {type === "객관식" && <OptionBox index={index} />}
    </div>
  );
};

export default StudyApplyQuestion;
