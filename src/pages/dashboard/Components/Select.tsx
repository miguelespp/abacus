import { useState } from "react";
import type { KeyboardEvent } from "react";

type SelecProps = {
  options: Option[];
  placeholder: string;
  onChange: (option: Option | null) => void;
};

type Option = {
  label: string;
  value: string;
};

const Select = ({ options, placeholder, onChange }: SelecProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionKeyDown = (
    event: KeyboardEvent<HTMLLIElement>,
    option: Option,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      handleOptionClick(option);
    }
  };

  return (
    <div className="relative w-64 my-2">
      <div
        className="bg-white border border-gray-300 rounded-md shadow-sm p-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
              onKeyDown={(event) => handleOptionKeyDown(event, option)}
              tabIndex={0}
              role="option"
              aria-selected={selectedOption?.value === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
export type { Option };
