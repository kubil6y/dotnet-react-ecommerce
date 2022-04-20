import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { Header } from "./Header";
import { Routes } from "../routes";

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
      <ToastContainer position="top-right" theme="colored" />
      <CssBaseline />
      <Header isDarkMode={isDarkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes />
      </Container>
    </ThemeProvider>
  );
};
