import React, { useEffect, useReducer, useRef, useState } from "react";
import { Style } from "./style";

interface CustomInputNumberProps {
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  value?: number;
  disabled?: boolean;
  onChange?: (event: string) => void;
  onBlur?: (event: string) => void;
}

const CustomInputNumber = (props: CustomInputNumberProps) => {
  const { min, max, step, name, value, disabled, onChange, onBlur } = props;
  const [inputValue, setInputValue] = useState(0);
  const inputNum = useRef(0);
  const [mouseUp, setMouseUp] = useState(false);
  const timeout = useRef(null);
  const interval = useRef(null);

  // input 改變
  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    console.log(e);
  };

  // 增加
  const handlePlus = () => {
    setInputValue(inputValue + 1);
  };
  // 長按增加down
  const handlePlusMouseDown = () => {
    setMouseUp(false);
    timeout.current = setTimeout(longPress("plus"), 500);
  };
  // 長按增加up
  const handlePlusMouseUp = () => {
    setMouseUp(true);
  };
  // 減少
  const handleMinus = () => {
    setInputValue(inputValue - 1);
  };

  // 長按減少down
  const handleMinusMouseDown = () => {
    setMouseUp(false);
    timeout.current = setTimeout(longPress("minus"), 500);
  };
  // 長按減少up
  const handleMinusMouseUp = () => {
    setMouseUp(true);
  };

  const longPress = (type: string) => () => {
    inputNum.current = inputValue;
    interval.current = setInterval(() => {
      if (type === "plus") {
        inputNum.current = inputNum.current + 1;
      } else {
        inputNum.current = inputNum.current - 1;
      }
      setInputValue(inputNum.current);
    }, 100);
  };

  useEffect(() => {
    if (mouseUp) {
      clearTimeout(timeout.current);
      clearInterval(interval.current);
    }
  }, [mouseUp]);

  return (
    <Style>
      {!disabled && (
        <div className="flex dashed">
          <span
            className={"flex square blue"}
            onClick={handleMinus}
            onMouseDown={handleMinusMouseDown}
            onMouseUp={handleMinusMouseUp}
          >
            -
          </span>

          <input
            type="number"
            className="flex square input"
            onChange={handleChange}
            value={inputValue}
          />

          <span
            className="flex square blue"
            onClick={handlePlus}
            onMouseDown={handlePlusMouseDown}
            onMouseUp={handlePlusMouseUp}
          >
            +
          </span>
        </div>
      )}
    </Style>
  );
};

export default CustomInputNumber;
