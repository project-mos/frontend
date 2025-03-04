import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Tag from '@/components/atoms/Tag';
import Typography from '@/components/atoms/Typography';

interface LabelTagInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  tagList: string[];
  setTagList: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  id?: string;
}

const LabelTagInput = ({
  tagList,
  setTagList,
  label,
  id,
  required,
  ...props
}: LabelTagInputProps) => {
  const [tagElement, setTagElement] = useState("");

  const inputId = id ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagElement(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === "Enter" || event.key === " ") && tagElement.trim()) {
      setTagList((prevTags) => [...prevTags, tagElement.trim()]);
      setTagElement("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTagList((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-full flex-col gap-[10px]">
      <label htmlFor={inputId} className="flex items-center">
        <Typography.P1>
          {label} {required ? "*" : ""}
        </Typography.P1>
      </label>

      <Input
        id={inputId}
        value={tagElement}
        onChange={handleTagChange}
        onKeyDown={handleKeyDown}
        className="w-full placeholder:text-mos-gray-500"
        {...props}
      />

      <div className="flex flex-wrap gap-2">
        {tagList.map((tag, index) => (
          <Tag.Detail key={index} className="flex items-center gap-2 px-5 py-4">
            <Typography.P1>{tag}</Typography.P1>
            <button onClick={() => handleRemoveTag(index)} className="text-sm">
              ✕
            </button>
          </Tag.Detail>
        ))}
      </div>
    </div>
  );
};

export default LabelTagInput;
