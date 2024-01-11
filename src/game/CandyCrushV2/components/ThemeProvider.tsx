import { createTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#101010",
    },
  },
});

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
