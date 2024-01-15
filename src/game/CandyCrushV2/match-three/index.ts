import { create } from "zustand";
import { TItem } from "../types";
import { Config } from "../config";
import {
  clear,
  collapse,
  createRandomStableBoard,
  fill,
  isAdjacent,
  isStable,
  swap,
} from "./board";

type State = {
  board?: TItem[][];
  columnCount: number;
  rowCount: number;
  isCollapsing?: boolean;
  grab?: [number, number];
  drop?: [number, number];
};

type Action = {
  updateBoard: (
    board: State["board"],
    stage?: "clear" | "collapse" | "fill"
  ) => void;
  updateIsColapsing: (isCollapsing: State["isCollapsing"]) => void;
  updateGrab: (grab: State["grab"]) => void;
  updateDrop: (drop: State["drop"]) => void;
};

export const useGameStore = create<State & Action>((set) => ({
  board: createRandomStableBoard(Config.board?.rows, Config.board?.cols),
  columnCount: Config.board?.rows || 8,
  rowCount: Config.board?.cols || 8,
  isCollapsing: false,
  grab: undefined,
  drop: undefined,
  //
  updateBoard: (board) => set(() => ({ board })),
  updateIsColapsing: (isCollapsing) => set(() => ({ isCollapsing })),
  updateGrab: (grab) => set(() => ({ grab })),
  updateDrop: (newDrop) =>
    set(({ grab, board, updateGrab, updateBoard, updateIsColapsing }) => {
      updateGrab(undefined);

      if (grab && newDrop && isAdjacent(grab, newDrop)) {
        const previousBoard = board;
        const swappedBoard = swap(grab, newDrop, board);

        updateBoard(swappedBoard);

        if (isStable(swappedBoard)) {
          setTimeout(() => {
            updateBoard(previousBoard);
          }, 1000 / 2);
        } else {
          updateIsColapsing(true);

          const newBoard = [...swappedBoard];

          const trimBoard = () => {
            setTimeout(() => {
              const clearedBoard = clear(newBoard);
              updateBoard(clearedBoard);
              newBoard.length = 0;
              newBoard.push(...clearedBoard);
            }, 1000 / 3);
            setTimeout(() => {
              const collapsedBoard = collapse(newBoard);
              updateBoard(collapsedBoard);
              newBoard.length = 0;
              newBoard.push(...collapsedBoard);
            }, (1000 / 3) * 2);
            setTimeout(() => {
              const filledBoard = fill(newBoard);
              updateBoard(filledBoard);
              newBoard.length = 0;
              newBoard.push(...filledBoard);
              if (!isStable(filledBoard)) {
                trimBoard();
              } else {
                updateIsColapsing(false);
              }
            }, (1000 / 3) * 3);
          };
          trimBoard();
        }
      }

      return { drop: newDrop };
    }),
}));
