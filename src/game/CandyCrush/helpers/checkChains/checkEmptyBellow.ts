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
      // const tiles = layer.children;
      // const currentTile = tiles.find((tile) => +tile.attrs.id === i);
      // const belowPosition = getTilePosition(i + fieldDimensions);

      // if (currentTile) {
      //   const copy = Rect({
      //     x: currentTile.getAttr("x"),
      //     y: currentTile.getAttr("y"),
      //     height: currentTile.getAttr("height"),
      //     width: currentTile.getAttr("width"),
      //     fill: currentTile.getAttr("fill"),
      //     stroke: currentTile.getAttr("stroke"),
      //     strokeWidth: currentTile.getAttr("strokeWidth"),
      //   }) as Shape<ShapeConfig>;
      //   tiles.push(copy);
      // }

      // const belowTile = tiles.find(
      //   (tile) => +tile.attrs.id === i + fieldDimensions
      // );
      // const currentPosition = getTilePosition(i);

      // if (currentTile)
      //   moveTileAnimation(currentTile, belowPosition, 0.2, "Linear");

      // setTimeout(() => {
      colorArrangementCopy[i + fieldDimensions].color =
        colorArrangementCopy[i].color;
      colorArrangementCopy[i].color = "transparent";
      //   if (currentTile) moveTileAnimation(currentTile, currentPosition, 0);
      // }, 200);

      allTheCandiesFell = false;
    }
  }

  return { colorArrangement: colorArrangementCopy, allTheCandiesFell };
};
