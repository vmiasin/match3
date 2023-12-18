import { Layer } from "konva/lib/Layer";
import { TTile } from "../../types";
import { Dispatch, SetStateAction } from "react";
import getTilePosition from "../getTilePosition";
import Konva from "konva";

export const onDragEnd = (
  layer: Layer | null,
  id: number,
  selectedNeighbourId: number | undefined,
  colorArrangement: TTile[],
  setColorArrangement: Dispatch<SetStateAction<TTile[]>>
) => {
  if (layer && layer.children && selectedNeighbourId) {
    const tiles = layer.children;
    const currentTile = tiles.find((tile) => +tile.attrs.id === id);
    const currentTilePosition = getTilePosition(id);
    const selectedNeighbourTile = tiles.find(
      (tile) => +tile.attrs.id === selectedNeighbourId
    );
    const selectedNeighbourPosition = getTilePosition(selectedNeighbourId);

    if (currentTile)
      currentTile.to({
        x: selectedNeighbourPosition.x,
        y: selectedNeighbourPosition.y,
        duration: 0.5,
        easing: Konva.Easings.EaseInOut,
      });

    if (selectedNeighbourTile)
      selectedNeighbourTile.to({
        x: currentTilePosition.x,
        y: currentTilePosition.y,
        duration: 0.5,
        easing: Konva.Easings.EaseInOut,
      });
  }
  colorArrangement.forEach((ca) => (ca.stroke = "black"));
  setColorArrangement(colorArrangement);
};
