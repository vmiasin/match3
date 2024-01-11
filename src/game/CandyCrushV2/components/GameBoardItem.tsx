import { motion } from "framer-motion";
import { useRef } from "react";
import { ItemType } from "../match-three/board";
import { useDisableZoom } from "./useDisableZoom";
import { TItem } from "../types";

const DefaultItem = ({ item }: { item: TItem }) => (
  <img src={item.image} alt="" className="w-full h-full object-contain" />
);

const RadiusBombItem = ({ item }: { item: TItem }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      background: item.color,
    }}
  />
);

const ColorBombItem = ({ item }: { item: TItem }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "transparent",
      borderRadius: "50%",
      border: `10px solid ${item.color}`,
    }}
  />
);

const LineBombItem = ({ item }: { item: TItem }) => (
  <div
    style={{
      borderRadius: "5px",
      width: "100%",
      height: "100%",
      background: "transparent",
      border: `10px solid ${item.color}`,
    }}
  />
);

export const Item = ({ item }: { item: TItem }) => {
  switch (item.type) {
    case ItemType.LineBomb:
      return <LineBombItem item={item} />;
    case ItemType.RadiusBomb:
      return <RadiusBombItem item={item} />;
    case ItemType.ColorBomb:
      return <ColorBombItem item={item} />;
    default:
      return <DefaultItem item={item} />;
  }
};

export const GameBoardItem = ({ item }: { item: TItem }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useDisableZoom(ref.current);

  return (
    <motion.div
      style={{ zIndex: 100, width: "100%", height: "100%" }}
      ref={ref}
      initial={{
        scale: 0,
        transformOrigin: "center",
      }}
      animate={{
        scale: 0.85,
        transformOrigin: "center",
      }}
      exit={{
        transformOrigin: "center",
        scale: 0,
      }}
    >
      <Item item={item} />
    </motion.div>
  );
};
