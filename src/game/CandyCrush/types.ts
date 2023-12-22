export type TTile = {
  id: number;
  color: string;
  stroke: string;
};

export type TNeighbours = {
  id: number;
  direction: "up" | "down" | "left" | "right";
}[];

export type TPosition = { x: number; y: number };
