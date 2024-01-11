import { Container } from "@material-ui/core";
// import { GameBar } from "./GameBar";
import { GameBoard } from "./GameBoard";
import { useDisableZoom } from "./useDisableZoom";

export const App = () => {
  return (
    <Container maxWidth="xs" disableGutters>
      {/* <GameBar /> */}
      <GameBoard />
    </Container>
  );
};
