import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Routes } from "../routes";
import { getCookie } from "../utils";
import { useStoreContext } from "../context/StoreContext";
import { agent } from "../api/Agent";
import { LoadingComponent } from "./LoadingComponent";

type PaletteMode = "dark" | "light";

export const App = () => {
  const { setBasket } = useStoreContext();
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

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.GetBasket()
        .then((basket) => setBasket(basket))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

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
