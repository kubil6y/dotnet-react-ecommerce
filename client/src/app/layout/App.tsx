import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { Header } from "./Header";
import { Routes } from "../routes";
import { LoadingComponent } from "./LoadingComponent";
import { useAppDispatch } from "../store";
import { getBasketAsync } from "../../features/basket";
import { getCurrentUserAsync } from "../../features/account";

type PaletteMode = "dark" | "light";

export const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
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

  const initApp = useCallback(async () => {
    try {
      await dispatch(getCurrentUserAsync());
      await dispatch(getBasketAsync());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  function handleThemeChange() {
    setIsDarkMode((b) => !b);
  }

  if (loading) {
    return <LoadingComponent message="Initializing app..." />;
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
