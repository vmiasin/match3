import { Status } from "../match-three";
import { useMatchThree } from "../match-three/useMatchThree";

export const useStylesCursor = () => {
  const { status, grabbed } = useMatchThree();
  const isCollapsing = status === Status.COLLAPSING;
  const isGrabbed = Boolean(grabbed);

  if (isCollapsing) {
    return "cursor-wait";
  }

  if (isGrabbed) {
    return "cursor-grabbing";
  }

  return "cursor-grab";
};
