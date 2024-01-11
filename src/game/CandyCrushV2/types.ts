export type TConfig = {
  board?: {
    cols?: number;
    rows?: number;
  };
  tiles: {
    key: string;
    image: string;
    color: string;
  }[];
};

export type TItem = {
  id: string;
  type: "ColorBomb" | "RadiusBomb" | "LineBomb" | unknown;
  key: string;
  color: string;
  image: string;
};
