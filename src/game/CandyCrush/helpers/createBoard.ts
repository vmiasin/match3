import config from "../config";

export type TTile = {
  id: number;
  color: string;
};

const createBoard = (): TTile[] => {
  const { fieldDimensions, candyColors } = config;
  const randomColorArrangement = [];
  for (let i = 0; i < fieldDimensions * fieldDimensions; i++) {
    randomColorArrangement.push({
      id: i,
      color: candyColors[Math.floor(Math.random() * candyColors.length)],
    });
  }
  return randomColorArrangement;
};

export default createBoard;
