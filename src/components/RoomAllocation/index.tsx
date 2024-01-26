import React, { useEffect, useState } from "react";
import { Style } from "./style";
import CustomInputNumber, { targat } from "../CustomInputNumber";
import {
  RoomAllocationProps,
  inputObj,
  resultType,
  roomInit,
  roomObj,
} from "./init";

const RoomAllocation = (props: RoomAllocationProps) => {
  const { guest, room, onChange } = props;
  const [result, setResult] = useState<resultType[]>([]);
  const [roomDetail, setRoomDetail] = useState<roomObj[]>([]);
  const [guestTotal, setGuestTotal] = useState(0);

  /**  input 改變  */
  const handleChange = (target: targat) => {
    const { name, value } = target;
    const mapData = roomDetail.map((item) => {
      const isAdult = name.includes("adult");
      if (name.includes(item.roomId)) {
        return {
          ...item,
          adult: isAdult
            ? {
                ...item.adult,
                value: Number(value),
                max: 4 - item.child.value,
              }
            : { ...item.adult, max: 4 - Number(value) },
          child: !isAdult
            ? {
                ...item.child,
                value: Number(value),
                max: 4 - item.adult.value,
              }
            : { ...item.child, max: 4 - Number(value) },
        };
      }
      return item;
    });
    setRoomDetail(mapData);
    const resultData = mapData.map((item) => {
      return {
        adult: item.adult.value,
        child: item.child.value,
      };
    });
    setResult(resultData);
    onChange(resultData);
  };
  /**  input blur  */
  const handleBlur = (target: targat) => {
    console.log(target);
  };

  useEffect(() => {
    const data = new Array(room).fill(roomInit).map((el, i) => {
      return {
        roomId: `room${i + 1}`,
        roomNum: 4,
        adult: {
          ...inputObj,
          name: `room${i + 1}_adult`,
          value: 1,
          max: 4,
          min: 1,
        },
        child: {
          ...inputObj,
          name: `room${i + 1}_child`,
          value: 0,
          max: 4,
          min: 0,
        },
      };
    });
    setRoomDetail(data);
    setGuestTotal(guest - room);
  }, [room]);

  useEffect(() => {
    if (result.length !== 0) {
      const numData = result.map((item) => {
        return item.adult + item.child;
      });
      const total = numData.reduce((a, b) => a + b);
      setGuestTotal(guest - total);
    }
  }, [result]);

  return (
    <Style>
      <div className="warp">
        <h1 className="title">
          住客人數 : {guest}人 / {room}房
        </h1>

        <div className="tootip">
          <div>尚未分配人數 : {guestTotal}人</div>
        </div>

        {roomDetail.map((el) => (
          <div key={el.roomId} className="room">
            <h2 className="title">房間 : 1 人</h2>
            <div className="flex between">
              <div className="adult">
                <p>大人</p>
                <span>年齡20+</span>
              </div>
              <CustomInputNumber
                {...el.adult}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={guestTotal <= 0}
              />
            </div>
            <div className="flex between">
              <div className="child">
                <p>小孩</p>
              </div>
              <CustomInputNumber
                {...el.child}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={guestTotal <= 0}
              />
            </div>
          </div>
        ))}
      </div>
    </Style>
  );
};

export default RoomAllocation;
