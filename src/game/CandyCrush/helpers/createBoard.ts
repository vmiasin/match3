import config from "../config";
import { TTile } from "../types";
import getRandomCandy from "./getRandomCandy";

const { fieldDimensions } = config;

const createBoard = (): TTile[] => {
  const randomColorArrangement = [];
  for (let i = 0; i < fieldDimensions * fieldDimensions; i++) {
    randomColorArrangement.push({
      id: i,
      color: getRandomCandy(),
      stroke: "black",
      zIndex: 0,
    });
  }
  return randomColorArrangement;
};

export default createBoard;
