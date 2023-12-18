import getNeighbours from "./getNeighbours";
import { onDragStart as onDragStartFunction } from "./onDragStart";
import { onDragMove as onDragMoveFunction } from "./onDragMove";
import { onDragEnd as onDragEndFunction } from "./onDragEnd";
import { TTile } from "../../types";
import { Dispatch, SetStateAction } from "react";
import getTilePosition from "../getTilePosition";
import { Layer } from "konva/lib/Layer";

export type TNeighbours = {
  id: number;
  direction: "up" | "down" | "left" | "right";
}[];

export type TPosition = { x: number; y: number };

class Moves {
  id: number;
  neighbours: TNeighbours;
  setColorArrangement: Dispatch<SetStateAction<TTile[]>>;
  dragStartPosition: TPosition;
  layer: Layer | null;

  constructor(
    id: number,
    setColorArrangement: Dispatch<SetStateAction<TTile[]>>,
    layer: Layer | null
  ) {
    this.id = id;
    this.neighbours = getNeighbours(id);
    this.setColorArrangement = setColorArrangement;
    this.dragStartPosition = getTilePosition(id);
    this.layer = layer;
  }

  onDragStart() {
    onDragStartFunction(this.layer, this.id);
  }

  onDragMove(
    colorArrangement: TTile[],
    setSelectedNeighbourId: Dispatch<SetStateAction<number | undefined>>
  ) {
    const dragMoveResult = onDragMoveFunction(
      this.layer,
      this.id,
      this.neighbours,
      this.dragStartPosition,
      colorArrangement,
      this.setColorArrangement
    );
    if (dragMoveResult?.selectedNeighbour)
      setSelectedNeighbourId(dragMoveResult?.selectedNeighbour?.id);
  }

  onDragEnd(
    colorArrangement: TTile[],
    selectedNeighbourId: number | undefined
  ) {
    onDragEndFunction(
      this.layer,
      this.id,
      selectedNeighbourId,
      colorArrangement,
      this.setColorArrangement
    );
  }
}

export default Moves;
