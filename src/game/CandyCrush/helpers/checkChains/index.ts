import { universalCheckCombination } from "./universalCheckCombination";
import { checkEmptyBellow as checkEmptyBellowFunction } from "./checkEmptyBellow";
import { TTile } from "../../types";
import { Layer } from "konva/lib/Layer";

class CheckForChains {
  colorArrangement: TTile[];
  allTheCandiesFell: boolean;
  layer: Layer | null;

  constructor(colorArrangement: TTile[], layer: Layer | null) {
    this.colorArrangement = colorArrangement;
    this.allTheCandiesFell = true;
    this.layer = layer;
  }

  checkForColumnOfFive() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1],
        [1],
        [1],
        [1],
        [1],
      ]);
    }
    return this;
  }

  checkForColumnOfFour() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1],
        [1],
        [1],
        [1],
      ]);
    }
    return this;
  }

  checkForColumnOfThree() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1],
        [1],
        [1],
      ]);
    }
    return this;
  }
  checkForRowOfFive() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(
        this.colorArrangement,
        [1, 1, 1, 1, 1]
      );
    }
    return this;
  }
  checkForRowOfFour() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(
        this.colorArrangement,
        [1, 1, 1, 1]
      );
    }
    return this;
  }

  checkForRowOfThree() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(
        this.colorArrangement,
        [1, 1, 1]
      );
    }
    return this;
  }

  checkForSquare() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1, 1],
        [1, 1],
      ]);
    }
    return this;
  }

  checkForTwoByThreeV1() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1, 1],
        [1, 0],
        [1, 0],
      ]);
    }
    return this;
  }

  checkForTwoByThreeV2() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1, 1],
        [0, 1],
        [0, 1],
      ]);
    }
    return this;
  }

  checkForTwoByThreeV3() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1, 0],
        [1, 0],
        [1, 1],
      ]);
    }
    return this;
  }

  checkForTwoByThreeV4() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1, 1],
        [1, 0],
        [1, 0],
      ]);
    }
    return this;
  }

  checkForThreeByTwoV1() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1, 0, 0],
        [1, 1, 1],
      ]);
    }
    return this;
  }

  checkForThreeByTwoV2() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [0, 0, 1],
        [1, 1, 1],
      ]);
    }
    return this;
  }

  checkForThreeByTwoV3() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1, 1, 1],
        [1, 0, 0],
      ]);
    }
    return this;
  }

  checkForThreeByTwoV4() {
    if (this.allTheCandiesFell) {
      this.colorArrangement = universalCheckCombination(this.colorArrangement, [
        [1, 1, 1],
        [0, 0, 1],
      ]);
    }
    return this;
  }

  checkEmptyBellow() {
    const { colorArrangement, allTheCandiesFell } = checkEmptyBellowFunction(
      this.colorArrangement,
      this.layer
    );
    this.colorArrangement = colorArrangement;
    this.allTheCandiesFell = allTheCandiesFell;
    return this;
  }
}

export default CheckForChains;
