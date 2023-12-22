import config from "../../config";
import { TTile } from "../../types";

const { fieldDimensions, candyColors } = config;

export const universalCheckCombination = (
  colorArrangement: TTile[],
  shape: number[] | number[][]
) => {
  const isShapeTwoDimensional = Array.isArray(shape[0]);
  const colorArrangementCopy = [...colorArrangement];

  // размеры фигуры
  const shapeDimensions = {
    x: isShapeTwoDimensional ? (shape[0] as number[]).length : shape.length,
    y: isShapeTwoDimensional ? shape.length : 0,
  };

  // размеры индексируемого поля
  const indexFieldDimensions = {
    x: fieldDimensions - (shapeDimensions.x - 1),
    y: fieldDimensions - (shapeDimensions.y ? shapeDimensions.y - 1 : 0),
  };

  // индексируемое поле
  const indexField = [];
  for (let y = 0; y < indexFieldDimensions.y; y++) {
    for (let x = 0; x < indexFieldDimensions.x; x++) {
      indexField.push(x + y * fieldDimensions);
    }
  }

  // индексы на поле по фигуре
  const shapeIndexes = (i: number) => {
    const indexes: number[] = [];
    if (isShapeTwoDimensional) {
      for (let y = 0; y < shapeDimensions.y; y++) {
        for (let x = 0; x < shapeDimensions.x; x++) {
          if ((shape[y] as number[])[x] === 1)
            indexes.push(i + y * fieldDimensions + x);
        }
      }
    } else {
      for (let x = 0; x < shapeDimensions.x; x++) {
        indexes.push(i + x);
      }
    }
    return indexes;
  };

  indexField.forEach((index) => {
    const indexesToCheck = shapeIndexes(index);
    const decidedColor = colorArrangementCopy[index].color;
    if (
      candyColors.includes(decidedColor) &&
      indexesToCheck.every(
        (tileIndex) => colorArrangementCopy[tileIndex]?.color === decidedColor
      )
    ) {
      indexesToCheck.forEach(
        (tileIndex) => (colorArrangementCopy[tileIndex].color = "transparent")
      );
    }
  });

  return colorArrangementCopy;
};
