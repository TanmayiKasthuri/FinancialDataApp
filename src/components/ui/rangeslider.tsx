import React, { useCallback, useEffect, useState, useRef } from "react";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onRangeChange: (newMin: number, newMax: number) => void;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ min, max, onRangeChange }) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number): number => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Update the range width and position based on minVal
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    onRangeChange(minVal, maxValRef.current);
  }, [minVal, getPercent]);

  // Update the range width and position based on maxVal
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
    onRangeChange(minValRef.current, maxVal);
  }, [maxVal, getPercent]);

  return (
    <div className="container mx-auto px-4">
  <div className="flex flex-wrap justify-center gap-4 ">
    <input
      type="range"
      min={min}
      max={max}
      value={minVal}
      onChange={(event) => {
        const value = Math.min(Number(event.target.value), maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
      }}
      className="thumb thumb--left w-32 sm:w-40"
      style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
    />
    <input
      type="range"
      min={min}
      max={max}
      value={maxVal}
      onChange={(event) => {
        const value = Math.max(Number(event.target.value), minVal + 1);
        setMaxVal(value);
        maxValRef.current = value;
      }}
      className="thumb thumb--right w-32 sm:w-40"
    />
  </div>

  <div className="slider mt-4">
    <div className="slider__track" />
    <div ref={range} className="slider__range" />
    <div className="slider__left-value">{minVal}-{maxVal}</div>
  </div>
</div>

  );
};

export default MultiRangeSlider;
