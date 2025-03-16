import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Typography from "@/components/atoms/Typography";
import React from "react";
import { useFormContext } from "react-hook-form";

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
      <Button.Solid
        type="button"
        color="Main"
        className="h-[42px] w-[50px] rounded-l-none"
        onClick={onRemove}
      >
        <i className="bi bi-trash text-mos-coral-500"></i>
      </Button.Solid>
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
  const rules: string[] = watch(name, [""]);

  const handleAddRule = () => {
    setValue(name, [...rules, ""]);
  };

  const handleChangeRule = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setValue(name, newRules);
  };

  const handleRemoveRule = (index: number) => {
    setValue(
      name,
      rules.filter((_, i) => i !== index)
    );
  };
  return (
    <Card>
      <Card.Header className="mb-[30px] flex justify-between">
        <Typography.SubTitle1>{subTitle}</Typography.SubTitle1>
        <div className="flex gap-[3px]">
          <Button.Default
            type="button"
            className="h-[35px]"
            onClick={handleAddRule}
          >
            <i className="bi bi-plus"></i>
            {buttonText}
          </Button.Default>
          <Button.Solid
            onClick={() => setIsInputBoxOpened(false)}
            type="button"
            color="Main"
            className="h-[35px]"
          >
            <i className="bi bi-x"></i>
            취소
          </Button.Solid>
        </div>
      </Card.Header>
      <Card.Content className="mb-[20px] flex flex-col gap-[13px]">
        {rules.map((rule, index) => (
          <InlineInput
            key={index}
            value={rule}
            onChange={(e) => handleChangeRule(index, e.target.value)}
            onRemove={() => handleRemoveRule(index)}
            placeholder={placeholder}
          />
        ))}
      </Card.Content>
    </Card>
  );
};

export default ContentInputBox;
