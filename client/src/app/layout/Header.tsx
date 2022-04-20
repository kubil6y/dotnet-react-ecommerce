import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface IHeaderProps {
  isDarkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { id: "m1", title: "catalog", path: "/catalog" },
  { id: "m2", title: "about", path: "/about" },
  { id: "m3", title: "contact", path: "/contact" },
];

const rightLinks = [
  { id: "r1", title: "login", path: "/login" },
  { id: "r2", title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

const flexCenter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const Header: FC<IHeaderProps> = ({ isDarkMode, handleThemeChange }) => {
  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar sx={flexCenter}>
        <Box sx={flexCenter}>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={navStyles}
            exact
          >
            RE-STORE
          </Typography>

          <Switch checked={isDarkMode} onChange={handleThemeChange}></Switch>
        </Box>

        <List sx={flexCenter}>
          {midLinks.map(({ id, path, title }) => (
            <ListItem component={NavLink} to={path} key={id} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box sx={flexCenter}>
          <IconButton size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ id, path, title }) => (
              <ListItem component={NavLink} to={path} key={id} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};