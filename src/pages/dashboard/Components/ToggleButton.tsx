import React from "react";

interface ToggleSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onChange }) => {
  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <div
      onClick={handleToggle}
      className={`w-14 h-8 my-auto flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        value ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          value ? "translate-x-6" : ""
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;
