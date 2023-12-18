import config from "../../config";
import { TTile } from "../../types";
import getRandomCandy from "../getRandomCandy";

const { fieldDimensions } = config;

export const checkEmptyBellow = (colorArrangementOriginal: TTile[]) => {
  const colorArrangementCopy = [...colorArrangementOriginal];
  let allTheCandiesFell = true;

  for (let i = 0; i < fieldDimensions * (fieldDimensions - 1); i++) {
    const isFirstRow = i < fieldDimensions;

    if (isFirstRow && colorArrangementCopy[i].color === "gray") {
      colorArrangementCopy[i].color = getRandomCandy();
      allTheCandiesFell = false;
    }

    if (colorArrangementCopy[i + fieldDimensions].color === "gray") {
      colorArrangementCopy[i + fieldDimensions].color =
        colorArrangementCopy[i].color;
      colorArrangementCopy[i].color = "gray";
      allTheCandiesFell = false;
    }
  }

  return { colorArrangement: colorArrangementCopy, allTheCandiesFell };
};
