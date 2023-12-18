import config from "../config";

const { fieldDimensions, candyDimensions, strokeWidth } = config;

const getTilePosition = (index: number) => ({
  x:
    ((index * candyDimensions) % (fieldDimensions * candyDimensions)) +
    strokeWidth,
  y: Math.floor(index / fieldDimensions) * candyDimensions + strokeWidth,
});

export default getTilePosition;
