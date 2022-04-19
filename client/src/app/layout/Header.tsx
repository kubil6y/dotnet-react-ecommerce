import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import { FC } from "react";

interface IHeaderProps {
  isDarkMode: boolean;
  handleThemeChange: () => void;
}

export const Header: FC<IHeaderProps> = ({ isDarkMode, handleThemeChange }) => {
  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <Switch checked={isDarkMode} onChange={handleThemeChange}></Switch>
      </Toolbar>
    </AppBar>
  );
};
