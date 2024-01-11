import { Layer } from "konva/lib/Layer";
import config from "../../config";
import { TTile } from "../../types";
import getRandomCandy from "../getRandomCandy";
// import getTilePosition from "../getTilePosition";
// import moveTileAnimation from "../moveTileAnimation";
// import { Rect } from "react-konva";
// import { Shape, ShapeConfig } from "konva/lib/Shape";

const { fieldDimensions } = config;

export const checkEmptyBellow = (
  colorArrangementOriginal: TTile[],
  layer: Layer | null
) => {
  const colorArrangementCopy = [...colorArrangementOriginal];
  let allTheCandiesFell = true;

  for (let i = 0; i < fieldDimensions * (fieldDimensions - 1); i++) {
    const isFirstRow = i < fieldDimensions;

    if (isFirstRow && colorArrangementCopy[i].color === "transparent") {
      colorArrangementCopy[i].color = getRandomCandy();
      allTheCandiesFell = false;
    }

    if (
      colorArrangementCopy[i + fieldDimensions].color === "transparent" &&
      layer &&
      layer.children
    ) {
      colorArrangementCopy[i + fieldDimensions].color =
        colorArrangementCopy[i].color;
      colorArrangementCopy[i].color = "transparent";

      allTheCandiesFell = false;
    }
  }

  return { colorArrangement: colorArrangementCopy, allTheCandiesFell };
};
