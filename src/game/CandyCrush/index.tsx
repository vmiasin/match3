import { useEffect, useState } from "react";
import config from "./config";
import { Layer, Rect, Stage } from "react-konva";
import createBoard, { type TTile } from "./helpers/createBoard";
import getTilePosition from "./helpers/getTilePosition";
import CheckForChains from "./helpers/checkChains";

const { fieldDimensions, candyDimensions } = config;

const CandyCrush = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<
    TTile[]
  >(createBoard());

  useEffect(() => {
    const timer = setInterval(() => {
      // более мощная комбинация должна быть выше
      const { colorArrangement } = new CheckForChains(currentColorArrangement)
        .checkForColumnOfFive()
        .checkForRowOfFive()
        .checkForSquare()
        .checkForTwoByThreeV1()
        .checkForTwoByThreeV2()
        .checkForTwoByThreeV3()
        .checkForTwoByThreeV4()
        .checkForThreeByTwoV1()
        .checkForThreeByTwoV2()
        .checkForThreeByTwoV3()
        .checkForThreeByTwoV4()
        .checkForColumnOfFour()
        .checkForRowOfFour()
        .checkForColumnOfThree()
        .checkForRowOfThree();
      setCurrentColorArrangement(colorArrangement);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <Stage
        width={fieldDimensions * candyDimensions}
        height={fieldDimensions * candyDimensions}
        className="bg-blue-100"
      >
        <Layer>
          {currentColorArrangement.map(({ id, color }, index) => {
            const { x, y } = getTilePosition(index);

            return (
              <Rect
                key={id}
                width={candyDimensions}
                height={candyDimensions}
                x={x}
                y={y}
                fill={color}
                stroke="black"
                strokeWidth={1}
                draggable
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default CandyCrush;
