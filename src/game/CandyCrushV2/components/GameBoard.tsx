import { AnimatePresence } from "framer-motion";
import { useRef } from "react";
import cn from "classnames";
import { Flipper } from "react-flip-toolkit";
import { useMatchThree } from "../match-three/useMatchThree";
import { GameBoardSlot } from "./GameBoardSlot";
import { useSize } from "./useSize";
import { useStylesCursor } from "./useStylesCursor";
// import { useGameStore } from "../match-three/state";

export const GameBoard = () => {
  const cursorClassName = useStylesCursor();
  const { board, columnCount, rowCount } = useMatchThree();

  // const { board, columnCount, rowCount } = useGameStore();

  const ref = useRef<HTMLDivElement | null>(null);
  const [boardWidth] = useSize(ref);
  const boardHeight = (boardWidth / columnCount) * rowCount;

  const flipKey = JSON.stringify(board);

  return (
    <div
      ref={ref}
      className={cn(cursorClassName, "w-full", "relative")}
      style={{ height: boardHeight }}
    >
      <Flipper flipKey={flipKey}>
        <AnimatePresence>
          {board.map((column, columnIndex) =>
            column.map((item, rowIndex) =>
              item ? (
                <GameBoardSlot
                  key={item.id}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  item={item}
                  boardHeight={boardHeight}
                  boardWidth={boardWidth}
                />
              ) : null
            )
          )}
        </AnimatePresence>
      </Flipper>
    </div>
  );
};
