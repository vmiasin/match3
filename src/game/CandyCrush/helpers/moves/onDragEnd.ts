import { Layer } from "konva/lib/Layer";
import { TNeighbours, TTile } from "../../types";
import { Dispatch, SetStateAction } from "react";
import getTilePosition from "../getTilePosition";
import moveTileAnimation from "../moveTileAnimation";

export const onDragEnd = (
  layer: Layer | null,
  id: number,
  neighbours: TNeighbours,
  selectedNeighbourId: number | undefined,
  colorArrangement: TTile[],
  setColorArrangement: Dispatch<SetStateAction<TTile[]>>
) => {
  if (layer && layer.children) {
    const tiles = layer.children;
    const currentTile = tiles.find((tile) => +tile.attrs.id === id);
    const selectedNeighbourTile =
      selectedNeighbourId &&
      neighbours.find((neighbour) => neighbour.id === selectedNeighbourId)
        ? tiles.find((tile) => +tile.attrs.id === selectedNeighbourId)
        : undefined;

    if (selectedNeighbourId && selectedNeighbourTile) {
      const currentTilePosition = getTilePosition(id);
      const selectedNeighbourPosition = getTilePosition(selectedNeighbourId);

      moveTileAnimation(selectedNeighbourTile, currentTilePosition, 0.2);
      if (currentTile)
        moveTileAnimation(currentTile, selectedNeighbourPosition, 0.2);

      setTimeout(() => {
        const tileColor = colorArrangement[id].color;
        const neighbourColor = colorArrangement[selectedNeighbourId].color;
        colorArrangement[id].color = neighbourColor;
        colorArrangement[selectedNeighbourId].color = tileColor;

        moveTileAnimation(selectedNeighbourTile, selectedNeighbourPosition, 0);
        if (currentTile) moveTileAnimation(currentTile, currentTilePosition, 0);
      }, 200);
    } else {
      const currentTilePosition = getTilePosition(id);

      if (currentTile) moveTileAnimation(currentTile, currentTilePosition, 0.5);
    }
  }
  colorArrangement.forEach((ca) => (ca.stroke = "transparent"));
  setColorArrangement(colorArrangement);
};
