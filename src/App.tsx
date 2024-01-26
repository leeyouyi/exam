import React from "react";
import RoomAllocation from "./components/RoomAllocation";
import { resultType } from "./components/RoomAllocation/init";

const inputObj = {
  name: "inputNumber",
  min: 0,
  max: 50,
  step: 2,
  disabled: false,
};

interface targat {
  name: string;
  value: string | number;
}
const App = () => {
  const handleResule = (resule: resultType[]) => {
    console.log(resule);
  };

  return <RoomAllocation guest={10} room={3} onChange={handleResule} />;
};

export default App;
