import { universalCheck } from "./universalCheck";
import { TTile } from "../createBoard";

class CheckForChains {
  colorArrangement: TTile[];

  constructor(colorArrangement: TTile[]) {
    this.colorArrangement = colorArrangement;
  }

  checkForColumnOfFive() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1],
      [1],
      [1],
      [1],
      [1],
    ]);
    return this;
  }
  checkForColumnOfFour() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1],
      [1],
      [1],
      [1],
    ]);
    return this;
  }

  checkForColumnOfThree() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1],
      [1],
      [1],
    ]);
    return this;
  }
  checkForRowOfFive() {
    this.colorArrangement = universalCheck(
      this.colorArrangement,
      [1, 1, 1, 1, 1]
    );
    return this;
  }
  checkForRowOfFour() {
    this.colorArrangement = universalCheck(this.colorArrangement, [1, 1, 1, 1]);
    return this;
  }

  checkForRowOfThree() {
    this.colorArrangement = universalCheck(this.colorArrangement, [1, 1, 1]);
    return this;
  }

  checkForSquare() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1, 1],
      [1, 1],
    ]);
    return this;
  }

  checkForTwoByThreeV1() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1, 1],
      [1, 0],
      [1, 0],
    ]);
    return this;
  }

  checkForTwoByThreeV2() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1, 1],
      [0, 1],
      [0, 1],
    ]);
    return this;
  }

  checkForTwoByThreeV3() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1, 0],
      [1, 0],
      [1, 1],
    ]);
    return this;
  }

  checkForTwoByThreeV4() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1, 1],
      [1, 0],
      [1, 0],
    ]);
    return this;
  }

  checkForThreeByTwoV1() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1, 0, 0],
      [1, 1, 1],
    ]);
    return this;
  }

  checkForThreeByTwoV2() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [0, 0, 1],
      [1, 1, 1],
    ]);
    return this;
  }

  checkForThreeByTwoV3() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1, 1, 1],
      [1, 0, 0],
    ]);
    return this;
  }

  checkForThreeByTwoV4() {
    this.colorArrangement = universalCheck(this.colorArrangement, [
      [1, 1, 1],
      [0, 0, 1],
    ]);
    return this;
  }
}

export default CheckForChains;
