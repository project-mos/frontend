import React from "react";
import { useFormContext } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Input from "@/shared/components/atoms/Input";
import Typography from "@/shared/components/atoms/Typography";

interface ContentInputBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  subTitle: string;
  buttonText: string;
  placeholder: string;
  setIsInputBoxOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InlineInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  placeholder: string;
}

type RuleItem = { ruleNum: number; content: string };
type BenefitItem = { benefitNum: number; content: string };
type InputItem = RuleItem | BenefitItem;

const InlineInput = ({
  value,
  onChange,
  onRemove,
  placeholder,
}: InlineInputProps) => {
  return (
    <div className="flex">
      <Input
        value={value}
        onChange={onChange}
        className="w-full rounded-r-none placeholder:text-mos-gray-500"
        placeholder={placeholder}
      />
      <Button.Ghost
        disabled={false}
        type="button"
        color="Main"
        className="h-[47px] w-[50px] rounded-l-none"
        onClick={onRemove}
      >
        <i className="bi bi-trash text-mos-coral-500"></i>
      </Button.Ghost>
    </div>
  );
};

const ContentInputBox = ({
  name,
  subTitle,
  buttonText,
  placeholder,
  setIsInputBoxOpened,
}: ContentInputBoxProps) => {
  const { watch, setValue } = useFormContext();
  const values: InputItem[] = watch(name, []);

  const handleAddInput = () => {
    const nextIndex = values.length + 1;
    const newItem =
      name === "rules"
        ? { ruleNum: nextIndex, content: "" }
        : { benefitNum: nextIndex, content: "" };

    setValue(name, [...values, newItem]);
  };

  const handleChangeInput = (index: number, content: string) => {
    const newArray = [...values];
    newArray[index] = {
      ...(name === "rules"
        ? { ruleNum: index + 1 }
        : { benefitNum: index + 1 }),
      content,
    };
    setValue(name, newArray);
  };

  const handleRemoveInput = (index: number) => {
    const filtered = values.filter((_, i) => i !== index);
    const updated = filtered.map(
      (item, i): InputItem => ({
        ...(name === "rules" ? { ruleNum: i + 1 } : { benefitNum: i + 1 }),
        content: item.content,
      })
    );
    setValue(name, updated);
  };

  return (
    <Card>
      <Card.Header className="mb-[30px] flex justify-between">
        <Typography.SubTitle1>{subTitle}</Typography.SubTitle1>
        <div className="flex gap-[3px]">
          <Button.Default
            type="button"
            className="h-[35px]"
            onClick={handleAddInput}
          >
            <i className="bi bi-plus"></i>
            {buttonText}
          </Button.Default>
          <Button.Ghost
            disabled={false}
            color="Main"
            onClick={() => {
              setIsInputBoxOpened(false);
              setValue(name, []);
            }}
            type="button"
            className="h-[35px]"
          >
            <i className="bi bi-x"></i>
            취소
          </Button.Ghost>
        </div>
      </Card.Header>
      <Card.Content className="mb-[20px] flex flex-col gap-[13px]">
        {values.map((item: InputItem, index: number) => (
          <InlineInput
            key={index}
            value={item.content}
            onChange={(e) => handleChangeInput(index, e.target.value)}
            onRemove={() => handleRemoveInput(index)}
            placeholder={placeholder}
          />
        ))}
      </Card.Content>
    </Card>
  );
};

export default ContentInputBox;
