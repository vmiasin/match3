import { Group } from "konva/lib/Group";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import Konva from "konva";
import { TPosition } from "../types";

const moveTileAnimation = (
  item: Group | Shape<ShapeConfig>,
  pos: TPosition,
  duration: number,
  easing?: "Linear" | "EaseInOut"
) => {
  item.to({
    ...pos,
    duration,
    easing: easing ? Konva.Easings[easing] : Konva.Easings.EaseInOut,
  });
};

export default moveTileAnimation;
