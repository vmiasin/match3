import { App } from "./App";
import { ReduxProvider } from "./ReduxProvider";

export const Root = () => {
  return (
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
};
