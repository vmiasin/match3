import { Group } from "konva/lib/Group";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { TPosition } from "./moves";
import Konva from "konva";

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
