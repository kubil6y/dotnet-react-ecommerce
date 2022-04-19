import "./styles.css";
import { useState } from "react";
import { Catalog } from "../../features/catalog";
import { Header } from "./Header";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

type PaletteMode = "dark" | "light";

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const paletteMode: PaletteMode = isDarkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteMode,
      background: {
        default: isDarkMode ? "#121212" : "#eaeaea",
      },
    },
  });

  function handleThemeChange() {
    setIsDarkMode((b) => !b);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header isDarkMode={isDarkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
};
