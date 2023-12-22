import config from "../../config";

const { fieldDimensions } = config;

const getNeighbours = (id: number) => {
  const neigbours: {
    id: number;
    direction: "up" | "down" | "left" | "right";
  }[] = [];

  if (id >= fieldDimensions) {
    neigbours.push({ id: id - fieldDimensions, direction: "up" });
  }

  if (id % fieldDimensions !== 7) {
    neigbours.push({ id: id + 1, direction: "right" });
  }

  if (id < fieldDimensions * (fieldDimensions - 1)) {
    neigbours.push({ id: id + fieldDimensions, direction: "down" });
  }

  if (id % fieldDimensions !== 0) {
    neigbours.push({ id: id - 1, direction: "left" });
  }

  return neigbours;
};

export default getNeighbours;
