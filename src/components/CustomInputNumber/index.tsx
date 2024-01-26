import React, { useEffect, useRef, useState } from "react";
import { Style } from "./style";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faplus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faminus";

interface CustomInputNumberProps {
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const CustomInputNumber = (props: CustomInputNumberProps) => {
  const {
    min,
    max,
    step = 1,
    name,
    value = 0,
    disabled,
    onChange,
    onBlur,
  } = props;
  const [inputValue, setInputValue] = useState(value);
  const inputNum = useRef(0);
  const [mouseUp, setMouseUp] = useState(false);
  const timeout = useRef(null);
  const interval = useRef(null);
  const plusBtn = useRef(null);
  const minusBtn = useRef(null);

  // /**  input 改變  */
  // const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
  //   console.log(e);
  // };
  // /**  input blur  */
  // const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
  //   console.log(e);
  // };

  /**  增加 */
  const handlePlus = () => {
    if (typeof inputValue === "string") {
      return false;
    }
    if (inputValue >= max) {
      return false;
    }
    setInputValue(inputValue + step);
  };
  /**  長按增加down */
  const handlePlusMouseDown = () => {
    setMouseUp(false);
    timeout.current = setTimeout(longPress("plus"), 500);
  };
  /**  長按增加up */
  const handlePlusMouseUp = () => {
    setMouseUp(true);
  };
  /**  減少 */
  const handleMinus = () => {
    if (typeof inputValue === "string") {
      return false;
    }
    if (inputValue <= min) {
      return false;
    }
    setInputValue(inputValue - step);
  };
  /**  長按減少down  */
  const handleMinusMouseDown = () => {
    setMouseUp(false);
    timeout.current = setTimeout(longPress("minus"), 500);
  };
  /** 長按減少up */
  const handleMinusMouseUp = () => {
    setMouseUp(true);
  };

  /** 長按function */
  const longPress = (type: string) => () => {
    if (typeof inputValue === "string") {
      return false;
    }
    inputNum.current = inputValue;
    interval.current = setInterval(() => {
      if (type === "plus" && inputNum.current < max) {
        inputNum.current = inputNum.current + step;
      } else if (type === "minus" && inputNum.current > min) {
        inputNum.current = inputNum.current - step;
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

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Style>
      <div className="flex dashed">
        <span
          id={name}
          suppressContentEditableWarning
          contentEditable={!disabled}
          className={
            !disabled
              ? "flex square minus"
              : classNames("flex square minus", "disabled")
          }
          {...(!disabled && {
            onClick: handleMinus,
            onMouseDown: handleMinusMouseDown,
            onMouseUp: handleMinusMouseUp,
            onBlur: onBlur,
          })}
        >
          <FontAwesomeIcon icon={faMinus} />
        </span>

        <input
          type="number"
          className="flex square input"
          name={name}
          value={inputValue}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />

        <span
          id={name}
          suppressContentEditableWarning
          contentEditable={!disabled}
          className={
            !disabled
              ? "flex square plus"
              : classNames("flex square plus", "disabled")
          }
          {...(!disabled && {
            onClick: handlePlus,
            onMouseDown: handlePlusMouseDown,
            onMouseUp: handlePlusMouseUp,
            onBlur: onBlur,
          })}
        >
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </Style>
  );
};

export default CustomInputNumber;
