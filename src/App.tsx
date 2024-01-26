import React, { useEffect, useState } from "react";
import CustomInputNumber from "./components/CustomInputNumber";
import RoomAllocation from "./components/RoomAllocation";

const inputObj = {
  name: "inputNumber",
  min: 0,
  max: 50,
  step: 2,
  disabled: false,
};

const App = () => {
  const { name } = inputObj;
  const [value, setValue] = useState<string | number>(0);
  /**  input 改變  */
  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.name === name) {
      const val = e.target.value === "" ? "" : Number(e.target.value);
      setValue(val);
    }
  };
  /**  input blur  */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.id === name) {
      console.log("span", e);
    }
    if (e.target.name === name) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log({ value });
  }, [value]);

  return (
    <>
      <RoomAllocation guest={10} room={3} onChange={(e) => console.log(e)} />
      {/* <CustomInputNumber
        value={value}
        {...inputObj}
        onChange={handleChange}
        onBlur={handleBlur}
      /> */}
    </>
  );
};

export default App;
