import { TConfig } from "./types";
import blue from "./sprites/blue.png";
import green from "./sprites/green.png";
import orange from "./sprites/orange.png";
import pink from "./sprites/pink.png";
import red from "./sprites/red.png";
import yellow from "./sprites/yellow.png";

export const Config: TConfig = {
  board: {
    cols: 7,
    rows: 7,
  },
  tiles: [
    {
      key: "red",
      image: red,
      color: "#db463b",
    },
    {
      key: "blue",
      image: blue,
      color: "#3b70db",
    },
    {
      key: "green",
      image: green,
      color: "#3bdb63",
    },
    {
      key: "orange",
      image: orange,
      color: "#d18528",
    },
    {
      key: "pink",
      image: pink,
      color: "#f57aa9",
    },
    {
      key: "yellow",
      image: yellow,
      color: "#f0d16e",
    },
  ],
};
