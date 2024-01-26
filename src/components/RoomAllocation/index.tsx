import React, { useState } from "react";
import { Style } from "./style";
import CustomInputNumber from "../CustomInputNumber";

interface result {
  adult: number;
  child: number;
}

interface RoomAllocationProps {
  guest: number;
  room: number;
  onChange: (e: result[]) => void;
}

const inputObj = {
  name: "inputNumber",
  value: 0,
  min: 0,
  max: 50,
  step: 2,
  disabled: false,
};

const RoomAllocation = (props: RoomAllocationProps) => {
  const { guest, room, onChange } = props;
  const roomArray = new Array(room).fill(0).map((el, i) => i + 1);
  const [result, setResult] = useState<result[]>([]);

  /**  input 改變  */
  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    console.log(e);
    // if (e.target.name === name) {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    //   setValue(val);
    // }
  };
  /**  input blur  */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    // if (e.target.id === name) {
    //   console.log("span", e);
    // }
    // if (e.target.name === name) {
    console.log(e);
    // }
  };
  return (
    <Style>
      <div className="warp">
        <h1 className="title">
          住客人數 : {guest}人 / {room}房
        </h1>

        <div className="tootip">
          <div>尚未分配人數 : 7人</div>
        </div>

        {roomArray.map((el) => (
          <div key={el} className="room">
            <h2 className="title">房間 : 1 人</h2>
            <div className="flex between">
              <div className="adult">
                <p>大人</p>
                <span>年齡20+</span>
              </div>
              <CustomInputNumber
                // value={value}
                {...inputObj}
                name={inputObj.name + el}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex between">
              <div className="child">
                <p>小孩</p>
              </div>
              <CustomInputNumber
                // value={value}
                {...inputObj}
                name={inputObj.name + el}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
        ))}
      </div>
    </Style>
  );
};

export default RoomAllocation;
