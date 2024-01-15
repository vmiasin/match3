import { AnimatePresence } from "framer-motion";
import { useRef } from "react";
import cn from "classnames";
import { Flipper } from "react-flip-toolkit";
import { GameBoardSlot } from "./GameBoardSlot";
import { useSize } from "./useSize";
import { useStylesCursor } from "./useStylesCursor";
import { useGameStore } from "../match-three";

export const GameBoard = () => {
  const cursorClassName = useStylesCursor();

  const points = useGameStore((state) => state.points);
  const board = useGameStore((state) => state.board);
  const columnCount = useGameStore((state) => state.columnCount);
  const rowCount = useGameStore((state) => state.rowCount);

  const ref = useRef<HTMLDivElement | null>(null);
  const [boardWidth] = useSize(ref);
  const boardHeight = (boardWidth / columnCount) * rowCount;

  const flipKey = JSON.stringify(board);

  return (
    <>
      <p className="w-max mx-auto">{points}</p>
      <div
        ref={ref}
        className={cn(cursorClassName, "w-full", "relative")}
        style={{ height: boardHeight }}
      >
        <Flipper flipKey={flipKey}>
          <AnimatePresence>
            {board &&
              board.map((column, columnIndex) =>
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
    </>
  );
};
