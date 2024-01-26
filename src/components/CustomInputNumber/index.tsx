import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Style } from "./style";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faplus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faminus";

export interface targat {
  name: string;
  value: string | number;
}
interface CustomInputNumberProps {
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: (targat: targat) => void;
  onBlur?: (targat: targat) => void;
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

  /**  input 改變  */
  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    if (val !== "" && val > max) {
      setInputValue(max);
      return false;
    }
    if (val !== "" && val < min) {
      setInputValue(min);
      return false;
    }
    setInputValue(val);
    onChange({
      name,
      value: val,
    });
  };

  /**  div blur  */
  const handleBlur = () => {
    onBlur({
      name,
      value: inputValue,
    });
  };

  /**  增加 */
  const handlePlus = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    if (typeof inputValue === "string") {
      return false;
    }
    if (inputValue >= max) {
      return false;
    }
    setInputValue(inputValue + step);
    onChange({
      name,
      value: inputValue + step,
    });
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
    onChange({
      name,
      value: inputValue - step,
    });
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
    timer(type)();
  };

  const timer = (type: string) => () => {
    if (type === "plus" && inputNum.current < max) {
      inputNum.current = inputNum.current + step;
      setInputValue(inputNum.current);
      onChange({
        name,
        value: inputNum.current,
      });
      interval.current = setTimeout(timer(type), 150);
    } else if (type === "minus" && inputNum.current > min) {
      inputNum.current = inputNum.current - step;
      setInputValue(inputNum.current);
      onChange({
        name,
        value: inputNum.current,
      });
      interval.current = setTimeout(timer(type), 150);
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (mouseUp) {
      clearTimeout(timeout.current);
      clearInterval(interval.current);
    }
  }, [mouseUp]);

  useEffect(() => {
    if (disabled) {
      clearInterval(interval.current);
    }
  }, [disabled]);

  const plusDisbbled = useMemo(
    () => inputValue !== "" && Number(inputValue) >= max,
    [max, inputValue]
  );
  const minusDisbbled = useMemo(
    () => inputValue !== "" && Number(inputValue) <= min,
    [max, inputValue]
  );

  return (
    <Style>
      <div className="flex dashed" onBlur={handleBlur}>
        <span
          id={name}
          suppressContentEditableWarning
          contentEditable={!disabled}
          className={
            !minusDisbbled
              ? "flex square minus"
              : classNames("flex square minus", "disabled")
          }
          {...(!minusDisbbled && {
            onClick: handleMinus,
            onMouseDown: handleMinusMouseDown,
            onMouseUp: handleMinusMouseUp,
          })}
        >
          <FontAwesomeIcon icon={faMinus} />
        </span>

        <input
          type="number"
          className="flex square input"
          name={name}
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
        />

        <span
          id={name}
          suppressContentEditableWarning
          contentEditable={!disabled}
          className={
            !disabled && !plusDisbbled
              ? "flex square plus"
              : classNames("flex square plus", "disabled")
          }
          {...(!disabled &&
            !plusDisbbled && {
              onClick: handlePlus,
              onMouseDown: handlePlusMouseDown,
              onMouseUp: handlePlusMouseUp,
            })}
        >
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </Style>
  );
};

export default CustomInputNumber;
