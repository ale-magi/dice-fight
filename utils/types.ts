
export interface DiceFace {
  value: number;
  color: string;
}

export interface Game {
  start: boolean,
  winner: undefined | string,
  active: string,
  p1: number,
  p2: number
}