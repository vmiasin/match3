import cn from "classnames";
import { GameBoard } from "./GameBoard";
import { Config } from "../config";

export const App = () => {
  return (
    <div
      className={cn("mx-auto", {
        "max-w-xs": Config.board?.maxWidth === "xs",
        "max-w-sm": Config.board?.maxWidth === "sm",
        "max-w-md": Config.board?.maxWidth === "md",
        "max-w-lg": Config.board?.maxWidth === "lg" || !Config.board?.maxWidth,
        "max-w-xl": Config.board?.maxWidth === "xl",
        "max-w-2xl": Config.board?.maxWidth === "2xl",
      })}
    >
      <GameBoard />
    </div>
  );
};
