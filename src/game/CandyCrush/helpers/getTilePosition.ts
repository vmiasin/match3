import config from "../config";

const { fieldDimensions, candyDimensions } = config;

const getTilePosition = (index: number) => ({
  x: (index * candyDimensions) % (fieldDimensions * candyDimensions),
  y: Math.floor(index / fieldDimensions) * candyDimensions,
});

export default getTilePosition;
