import { motion } from "framer-motion";
import * as R from "ramda";
import { useState } from "react";
import { Flipped } from "react-flip-toolkit";
import { Status } from "../match-three";
import { useMatchThree } from "../match-three/useMatchThree";
import { GameBoardItem } from "./GameBoardItem";
import { toPercent } from "../utility";
import { TItem } from "../types";

const selectedVariants = {
  notSelected: {
    scale: 1,
    opacity: 1,
  },
  selected: {
    scale: 1 + 1 / 3,
    opacity: 3 / 4,
  },
  hover: {
    scale: 0.9,
    opacity: 0.9,
  },
};

type Props = {
  rowIndex: number;
  columnIndex: number;
  boardHeight: number;
  boardWidth: number;
  item: TItem;
};

export const GameBoardSlot = ({
  rowIndex,
  columnIndex,
  boardHeight,
  boardWidth,
  item,
}: Props) => {
  const { grabbed, columnCount, rowCount, grab, drop, status } =
    useMatchThree();
  const isCollapsing = status === Status.COLLAPSING;
  const isGrabbed = R.equals(grabbed, [columnIndex, rowIndex]);
  const [isHovering, setIsHovering] = useState(false);

  const variant = isCollapsing
    ? "notSelected"
    : isGrabbed
    ? "selected"
    : isHovering
    ? "hover"
    : "notSelected";

  const handleGrab = () => {
    if (isGrabbed) {
      drop([columnIndex, rowIndex]);
    } else {
      grab([columnIndex, rowIndex]);
    }
  };

  const handleDrop = () => {
    if (grabbed) {
      drop([columnIndex, rowIndex]);
    }
  };

  return (
    <Flipped key={item.id} flipId={item.id}>
      <div
        style={{
          position: "absolute",
          top: toPercent(rowIndex / rowCount),
          left: toPercent(columnIndex / columnCount),
          width: boardWidth / columnCount,
          height: boardHeight / rowCount,
          zIndex: isGrabbed ? 2 : 1,
        }}
        onMouseDown={handleGrab}
        onMouseEnter={handleDrop}
      >
        <motion.div
          onHoverStart={() => {
            setIsHovering(true);
          }}
          onHoverEnd={() => {
            setIsHovering(false);
          }}
          style={{ width: "100%", height: "100%" }}
          variants={selectedVariants}
          initial="notSelected"
          animate={variant}
        >
          <GameBoardItem item={item} />
        </motion.div>
      </div>
    </Flipped>
  );
};
