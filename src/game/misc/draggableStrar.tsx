import { useRef, useState } from "react";
import { Layer, Stage, Star } from "react-konva";
import { KonvaEventObject, NodeConfig as KonvaNode } from "konva/lib/Node";
import getRandomFromRange from "../../helpers/getRandomFromRange";
import { Shape } from "konva/lib/Shape";

const pulseShape = (shape: KonvaNode) => {
  const startScale = {
    scaleX: shape.attrs.scaleX || 1,
    scaleY: shape.attrs.scaleY || 1,
  };
  shape.to({
    scaleX: startScale.scaleX * 1.5,
    scaleY: startScale.scaleY * 1.5,
    onFinish: () => {
      shape.to({
        ...startScale,
      });
    },
  });
};

const rotate = (shape: Shape) => {
  shape.to({
    rotation: getRandomFromRange(-360, 360),
    duration: 0.6,
  });
};

function DraggableStar() {
  const starRef = useRef(null);
  const [position, setPosition] = useState({
    x: getRandomFromRange(0, window.innerWidth),
    y: getRandomFromRange(0, window.innerHeight),
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleStageClick = () => {
    const shape = starRef.current;
    if (shape !== null) {
      pulseShape(shape);
    }
  };

  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
    rotate(e.target as Shape);
    setIsDragging(true);
  };
  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    setPosition({
      x: e.target.x(),
      y: e.target.y(),
    });
    setIsDragging(false);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleStageClick}
      onTap={handleStageClick}
    >
      <Layer>
        <Star
          ref={starRef}
          x={position.x}
          y={position.y}
          numPoints={8}
          innerRadius={30}
          outerRadius={70}
          fill={isDragging ? "pink" : "red"}
          opacity={0.6}
          draggable
          scaleX={1}
          scaleY={1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragMove={(e) => console.log(e)}
        />
      </Layer>
    </Stage>
  );
}

export default DraggableStar;
