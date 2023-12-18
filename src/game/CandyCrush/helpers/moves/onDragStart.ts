import { Layer } from "konva/lib/Layer";
import config from "../../config";

const { fieldDimensions } = config;

export const onDragStart = (layer: Layer | null, id: number) => {
  if (layer) {
    const tiles = layer?.children;
    const currentTile = tiles.find((tile) => +tile.attrs.id === id);

    if (currentTile) currentTile.setZIndex(fieldDimensions ** 2 - 1);
  }
};
