
export interface DiceFace {
  value: number;
  color: string;
}

export interface Game {
  start: boolean,
  winner: undefined | string,
  active: "p1" | "p2",
  //TODO: types these should be keys of players array, or let them be dynamic (as: nameByUserX: number)
  p1: number,
  p2: number
}