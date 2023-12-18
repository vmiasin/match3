import { TNeighbours, TPosition } from ".";
import { TTile } from "../../types";
import { Dispatch, SetStateAction } from "react";
import { Layer } from "konva/lib/Layer";

export const onDragMove = (
  layer: Layer | null,
  id: number,
  neighbours: TNeighbours,
  dragStartPosition: TPosition,
  colorArrangement: TTile[],
  setColorArrangement: Dispatch<SetStateAction<TTile[]>>
) => {
  if (layer) {
    const tiles = layer?.children;
    const currentTile = tiles.find((tile) => +tile.attrs.id === id);
    if (currentTile) {
      const currentPosition = {
        x: currentTile.attrs.x,
        y: currentTile.attrs.y,
      };
      const moveDelta = {
        x: currentPosition.x - dragStartPosition.x,
        y: currentPosition.y - dragStartPosition.y,
      };
      const moveDirection =
        Math.abs(moveDelta.x) > Math.abs(moveDelta.y)
          ? moveDelta.x > 0
            ? "right"
            : "left"
          : moveDelta.y > 0
          ? "down"
          : "up";

      const selectedNeighbour = neighbours.find(
        (neighbour) => neighbour.direction === moveDirection
      );

      neighbours.forEach(({ id }) => {
        if (id !== selectedNeighbour?.id) {
          colorArrangement[id].stroke = "red";
        } else {
          colorArrangement[id].stroke = "yellow";
        }
      });

      setColorArrangement(colorArrangement);

      return { selectedNeighbour };
    }
  }
};
