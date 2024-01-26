export interface resultType {
  adult: number;
  child: number;
}

export interface RoomAllocationProps {
  guest: number;
  room: number;
  onChange: (e: resultType[]) => void;
}

export interface inputInfo {
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
}
export interface roomObj {
  roomId: string;
  roomNum: number;
  adult: inputInfo;
  child: inputInfo;
}

export const inputObj = {
  name: "input",
  value: 0,
  min: 0,
  max: 10,
  step: 1,
  disabled: false,
};

export const roomInit = {
  roomId: "room",
  roomNum: 4,
  adult: inputObj,
  child: inputObj,
};
