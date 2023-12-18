import { useEffect, useRef, useState } from "react";
import config from "./config";
import { Layer, Rect, Stage } from "react-konva";
import createBoard from "./helpers/createBoard";
import getTilePosition from "./helpers/getTilePosition";
import CheckForChains from "./helpers/checkChains";
import { TTile } from "./types";
import Moves from "./helpers/moves";
import { type Layer as TLayer } from "konva/lib/Layer";

const { fieldDimensions, candyDimensions, strokeWidth } = config;

const CandyCrush = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<
    TTile[]
  >(createBoard());
  const [selectedNeighbourId, setSelectedNeighbourId] = useState<
    number | undefined
  >(undefined);

  const layerRef = useRef<TLayer>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      // более мощная комбинация должна быть выше
      const { colorArrangement } = new CheckForChains(currentColorArrangement)
        .checkEmptyBellow()
        .checkForColumnOfFive()
        .checkForRowOfFive()
        .checkForSquare()
        .checkForTwoByThreeV1() // ?
        .checkForTwoByThreeV2() // ?
        .checkForTwoByThreeV3() // ?
        .checkForTwoByThreeV4() // ?
        .checkForThreeByTwoV1() // ?
        .checkForThreeByTwoV2() // ?
        .checkForThreeByTwoV3() // ?
        .checkForThreeByTwoV4() // ?
        .checkForColumnOfFour() // ?
        .checkForRowOfFour()
        .checkForColumnOfThree()
        .checkForRowOfThree();
      setCurrentColorArrangement(colorArrangement);
    }, 500);
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
        <Layer ref={layerRef}>
          {currentColorArrangement.map(({ id, color, stroke }) => {
            const { x, y } = getTilePosition(id);

            const moves = new Moves(
              id,
              setCurrentColorArrangement,
              layerRef.current
            );

            return (
              <Rect
                key={id}
                id={`${id}`}
                width={candyDimensions - strokeWidth}
                height={candyDimensions - strokeWidth}
                x={x}
                y={y}
                fill={color}
                stroke={stroke}
                strokeWidth={strokeWidth}
                draggable
                onDragStart={() => moves.onDragStart()}
                onDragMove={() =>
                  moves.onDragMove(
                    currentColorArrangement,
                    setSelectedNeighbourId
                  )
                }
                onDragEnd={() =>
                  moves.onDragEnd(currentColorArrangement, selectedNeighbourId)
                }
                zIndex={0}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default CandyCrush;
