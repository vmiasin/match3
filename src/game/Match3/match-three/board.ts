import * as R from "ramda";
import { createId, distance, randomInt, randomNth } from "../utility";
import { Config } from "../config";
import { type TItem } from "../types";

type TBoard = TItem[][];
type TIndex = [number, number];

const MATCHING_SIZE = 3;
const BOMB_RADIUS = 1.5;

export const ItemType = {
  ColorBomb: "ColorBomb",
  RadiusBomb: "RadiusBomb",
  LineBomb: "LineBomb",
};

const createRandomItemType = () => {
  const bonusChance = Config.bonusChance || 1 / 20;
  return Math.random() <= bonusChance
    ? randomNth(R.values(ItemType))
    : undefined;
};

export const createRandomItem = (): TItem => {
  return {
    id: createId(),
    type: createRandomItemType(),
    ...Config.tiles[randomInt(Config.tiles.length - 1)],
  };
};

export const createRandomBoard = (rowCount = 8, columnCount = 8) =>
  R.times(() => R.times(() => createRandomItem(), rowCount), columnCount);

export const createRandomStableBoard = (rowCount = 8, columnCount = 8) => {
  const newBoard = createRandomBoard(rowCount, columnCount);
  while (!isStable(newBoard)) {
    newBoard.length = 0;
    newBoard.push(...createRandomBoard(rowCount, columnCount));
  }
  return newBoard;
};

const mergeColumns = R.zipWith((item1, item2) =>
  R.isNil(item1) || R.isNil(item2) ? null : item1
);

const mergeBoards = R.zipWith(mergeColumns);

const toColumnCount = R.length;

const toRowCount = R.pipe(R.head, R.length as (a: unknown) => unknown) as (
  list: readonly unknown[]
) => number;

const toIndexes = R.memoizeWith(
  (board) =>
    R.join(", ", [toColumnCount(board as TBoard), toRowCount(board as TBoard)]),
  (board: TBoard) =>
    R.xprod(R.range(0, toColumnCount(board)), R.range(0, toRowCount(board)))
);
const toIndexesWhere = (
  predicate: (_: TIndex, item: TItem) => boolean,
  board: TBoard
) =>
  R.filter(
    (index: TIndex) => predicate(index, R.path(index, board)),
    toIndexes(board)
  );

const setIndex = (index: TIndex, value: null, board: TBoard) =>
  R.set(R.lensPath(index), value, board);

/* 

clear matchings

*/

const clearColumnMatchings = R.map(
  R.pipe(
    R.groupWith(R.eqBy(R.prop("key") as (a: unknown) => unknown)),
    R.map(
      R.when(
        R.pipe(R.length, R.gte(R.__, MATCHING_SIZE)),
        R.map(R.always(null))
      )
    ),
    R.unnest
  )
) as (list: readonly (readonly unknown[])[]) => TBoard;

const clearRowMatchings = R.pipe(
  R.transpose,
  clearColumnMatchings,
  R.transpose
) as (list: readonly TItem[][]) => TBoard;

const clearMatchings = (board: TBoard) =>
  mergeBoards(clearRowMatchings(board), clearColumnMatchings(board)) as TBoard;

//

const toMatchingIndexes = (board: TBoard) =>
  toIndexesWhere(
    (_: TIndex, item: TItem) => R.isNil(item),
    clearMatchings(board)
  );

const toRowMatchingIndexes = (board: TBoard) =>
  toIndexesWhere(
    (_: TIndex, item: TItem) => R.isNil(item),
    clearRowMatchings(board)
  );

const toColumnMatchingIndexes = (board: TBoard) =>
  toIndexesWhere(
    (_: TIndex, item: TItem) => R.isNil(item),
    clearColumnMatchings(board)
  );

/* 

clear radius bombs

*/

const isRadiusBomb = (item: TItem) => item?.type === ItemType.RadiusBomb;

const toRadiusBombIndexes = (board: TBoard) =>
  toIndexesWhere((_: TIndex, item: TItem) => isRadiusBomb(item), board);

const clearRadius = (index1: TIndex, board: TBoard) =>
  R.reduce(
    (board, index) => setIndex(index, null, board),
    board,
    toIndexesWhere(
      (index2: TIndex) => distance(index1, index2) <= BOMB_RADIUS,
      board
    )
  );

const clearRadiusBombs = (board: TBoard) =>
  R.reduce(
    (runningBoard, index: TIndex) => clearRadius(index, runningBoard),
    board,
    R.intersection(toMatchingIndexes(board), toRadiusBombIndexes(board))
  );

/* 

clear same color bombs

*/

const isColorBomb = (item: TItem) => item?.type === ItemType.ColorBomb;

const toColorBombIndexes = (board: TBoard) =>
  toIndexesWhere(
    (_: [number, number], item: TItem) => isColorBomb(item),
    board
  );

const clearColor = (key: string | undefined, board: TBoard) =>
  R.map(
    R.map(R.when((item: TItem) => item?.key === key, R.always(null))),
    board
  );

const clearColorBombs = (board: TBoard) =>
  R.reduce(
    (runningBoard: TBoard, index: [number, number]) =>
      clearColor(R.path(index, board)?.key, runningBoard),
    board,
    R.intersection(toMatchingIndexes(board), toColorBombIndexes(board))
  );

/* 

clear line bombs

*/

const isLineBomb = (item: TItem) => item?.type === ItemType.LineBomb;

const toLineBombIndexes = (board: TBoard) =>
  toIndexesWhere((_: TIndex, item: TItem) => isLineBomb(item), board);

//

const clearColumn = (columnIndex: number, board: TBoard) =>
  R.reduce(
    (runningBoard, index) => setIndex(index, null, runningBoard),
    board,
    toIndexesWhere((index: [number, number]) => index[0] === columnIndex, board)
  );

const clearColumnLineBombs = (board: TBoard) =>
  R.reduce(
    (runningBoard, index: [number, number]) =>
      clearColumn(index[0], runningBoard),
    board,
    R.intersection(toColumnMatchingIndexes(board), toLineBombIndexes(board))
  );

//

const clearRow = (rowIndex: number, board: TBoard) =>
  R.reduce(
    (runningBoard, index) => setIndex(index, null, runningBoard),
    board,
    toIndexesWhere((index: [number, number]) => index[1] === rowIndex, board)
  );

const clearRowLineBombs = (board: TBoard) =>
  R.reduce(
    (runningBoard, index: [number, number]) => clearRow(index[1], runningBoard),
    board,
    R.intersection(toRowMatchingIndexes(board), toLineBombIndexes(board))
  );

/* 

clear board

*/

export const clear = (board: TBoard) =>
  R.reduce(mergeBoards, board, [
    clearMatchings(board),
    clearRadiusBombs(board),
    clearColorBombs(board),
    clearColumnLineBombs(board),
    clearRowLineBombs(board),
  ]) as TBoard;

/* 


*/

export const collapse = R.map(R.sort(R.descend(R.isNil)));

/* 


*/

export const fill = R.map(R.map(R.when(R.isNil, createRandomItem)));

/* 


*/

export const isStable = R.converge(R.equals, [R.identity, clear]);

/* 


*/

export const swap = R.curry(
  (index1, index2, board) =>
    R.pipe(
      R.assocPath(index1, R.path(index2, board)),
      R.assocPath(index2, R.path(index1, board))
    )(board) as TBoard
);

/* 


*/

export const isAdjacent = R.pipe(distance, R.equals(1));
