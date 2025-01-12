import React, { useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  initialFrom: number;
  initialTo: number;
  onChange: (from: number, to: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  initialFrom,
  initialTo,
  onChange,
}) => {
  const [fromValue, setFromValue] = useState(initialFrom);
  const [toValue, setToValue] = useState(initialTo);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromValue = Math.min(Number(e.target.value), toValue - step);
    setFromValue(newFromValue);
    onChange(newFromValue, toValue);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToValue = Math.max(Number(e.target.value), fromValue + step);
    setToValue(newToValue);
    onChange(fromValue, newToValue);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={fromValue}
          onChange={handleFromChange}
          className="w-40 h-2 bg-blue-500 rounded-lg"
        />
        <span className="text-sm text-blue-500">{fromValue}</span>
      </div>

      <div className="flex flex-col items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={toValue}
          onChange={handleToChange}
          className="w-40 h-2 bg-blue-500 rounded-lg"
        />
        <span className="text-sm text-blue-500">{toValue}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
