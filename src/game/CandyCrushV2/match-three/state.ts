import { create } from "zustand";
import { TItem } from "../types";
import { Config } from "../config";
import { createRandomBoard } from "./board";

type State = {
  board: TItem[][];
  columnCount: number;
  rowCount: number;
  isGrabbed?: boolean;
  isCollapsing?: boolean;
  grab?: [number, number];
  drop?: [number, number];
};

type Action = {
  updateBoard: (board: State["board"]) => void;
  updateIsGrabbed: (isGrabbed: State["isGrabbed"]) => void;
  updateIsColapsing: (isCollapsing: State["isCollapsing"]) => void;
  updateGrab: (grab: State["grab"]) => void;
  updateDrop: (drop: State["drop"]) => void;
};

export const useGameStore = create<State & Action>((set) => ({
  board: createRandomBoard(Config.board?.rows || 8, Config.board?.cols || 8),
  columnCount: Config.board?.rows || 8,
  rowCount: Config.board?.cols || 8,
  isGrabbed: false,
  isCollapsing: false,
  grab: undefined,
  drop: undefined,
  //
  updateBoard: (board) => set(() => ({ board })),
  updateIsGrabbed: (isGrabbed) => set(() => ({ isGrabbed })),
  updateIsColapsing: (isCollapsing) => set(() => ({ isCollapsing })),
  updateGrab: (grab) => set(() => ({ grab })),
  updateDrop: (drop) => set(() => ({ drop })),
}));
