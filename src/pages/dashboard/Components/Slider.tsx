import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface DualRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  minValue: number;
  maxValue: number;
  onChange: (values: number[]) => void;
}

const DualRangeSlider = ({
  min,
  max,
  step = 1,
  minValue,
  maxValue,
  onChange,
}: DualRangeSliderProps) => {
  const handleInputChange = (values: number[]) => {
    const [newMinValue, newMaxValue] = values;

    // Aseguramos que el valor máximo no sea menor que el mínimo
    if (newMinValue <= newMaxValue) {
      onChange([newMinValue, newMaxValue]);
      return;
    }
    onChange([newMaxValue, newMinValue]);
  };

  return (
    <div className="flex flex-col items-center w-72 h-fit mt-4 pt-2">
      <RangeSlider
        min={min}
        max={max}
        step={step}
        defaultValue={[minValue, maxValue]}
        onInput={handleInputChange}
        className="w-full"
      />
      <div className="flex justify-between w-full mt-2">
        <span className="text-sm text-gray-700">Min: {minValue}</span>
        <span className="text-sm text-gray-700">Max: {maxValue}</span>
      </div>
    </div>
  );
};

export default DualRangeSlider;
