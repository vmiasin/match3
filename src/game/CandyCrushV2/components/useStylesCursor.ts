import { useGameStore } from "../match-three";

export const useStylesCursor = () => {
  const isCollapsing = useGameStore((state) => state.isCollapsing);
  const isGrabbed = !!useGameStore((state) => state.grab);

  if (isCollapsing) {
    return "cursor-wait";
  }

  if (isGrabbed) {
    return "cursor-grabbing";
  }

  return "cursor-grab";
};
