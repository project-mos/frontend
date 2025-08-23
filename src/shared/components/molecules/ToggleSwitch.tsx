import React, { useState, useEffect } from "react";

interface ToggleSwitchProps {
  initialChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  initialChecked = false,
  onChange,
}) => {
  const [checked, setChecked] = useState<boolean>(initialChecked);

  // initialChecked가 변경될 때 checked 상태를 동기화
  useEffect(() => {
    setChecked(initialChecked);
  }, [initialChecked]);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="sr-only"
      />
      <div
        className={`relative h-7 w-14 rounded-full p-1 transition-colors duration-300 ease-in-out ${
          checked ? "bg-mos-main" : "bg-gray-200"
        }`}
      >
        <div
          className={`absolute left-1 top-1 size-5 rounded-full bg-white transition-transform duration-300 ease-in-out ${
            checked ? "translate-x-7" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
