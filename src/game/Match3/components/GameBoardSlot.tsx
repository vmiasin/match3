import { motion } from "framer-motion";
import * as R from "ramda";
import { useState } from "react";
import { Flipped } from "react-flip-toolkit";
import { GameBoardItem } from "./GameBoardItem";
import { toPercent } from "../utility";
import { TItem } from "../types";
import { useGameStore } from "../match-three";

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
  const columnCount = useGameStore((state) => state.columnCount);
  const rowCount = useGameStore((state) => state.rowCount);
  const grab = useGameStore((state) => state.grab);
  const isCollapsing = useGameStore((state) => state.isCollapsing);
  const updateGrab = useGameStore((state) => state.updateGrab);
  const updateDrop = useGameStore((state) => state.updateDrop);

  const isGrabbed = R.equals(grab, [columnIndex, rowIndex]);
  const [isHovering, setIsHovering] = useState(false);

  const variant = isCollapsing
    ? "notSelected"
    : isGrabbed
    ? "selected"
    : isHovering
    ? "hover"
    : "notSelected";

  const handleGrab = () => {
    if (!isCollapsing) {
      if (isGrabbed) {
        updateDrop([columnIndex, rowIndex]);
      } else {
        updateGrab([columnIndex, rowIndex]);
      }
    }
  };

  const handleDrop = () => {
    if (grab) {
      updateDrop([columnIndex, rowIndex]);
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
