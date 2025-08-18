import { useEffect, useState } from "react";
import ArrowDownIcon from "../../assets/icons/arrows/ArrowDown.svg";
import ArrowUpIcon from "../../assets/icons/arrows/ArrowUp.svg";

const NumberInput = ({ value, max, min, onChange, step, inputStyle, className }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    onChange(e.target.value);
    setInputValue(e.target.value);
  };

  const handleButtonIncrement = () => {
    setInputValue((inputValue) => inputValue + 1);
  };

  const handleButtonDecrement = () => {
    setInputValue((inputValue) => inputValue - 1);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue]);

  return (
    <div className={`relative w-[50px] bg-white ${className}`}>
      <input
        type="number"
        value={inputValue}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        style={inputStyle}
        className={`font-Windows95 pl-1 w-[30px] focus:outline-none`}
      />
      <div className="shadow-window-reverse absolute top-0 left-0 bg-transparent z-1 w-full h-full pointer-events-none"></div>
      <div className="absolute top-[2px] right-[2px] flex flex-col">
        <button
          className="h-2 w-[15px] shadow-window bg-window-background flex items-center justify-center"
          onClick={handleButtonIncrement}
        >
          <img src={ArrowUpIcon} />
        </button>
        <button
          className="h-2 w-[15px] shadow-window bg-window-background flex items-center justify-center"
          onClick={handleButtonDecrement}
        >
          <img src={ArrowDownIcon} />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
