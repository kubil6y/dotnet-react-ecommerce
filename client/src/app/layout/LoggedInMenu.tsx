import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { FC, useState } from "react";
import { logout } from "../../features/account";
import { clearBasket } from "../../features/basket";
import { useAppDispatch, useAppSelector } from "../store";

interface ILoggedInMenuProps {}

export const LoggedInMenu: FC<ILoggedInMenuProps> = () => {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
        sx={{
          typography: "h6",
        }}
      >
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Orders</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
            dispatch(clearBasket());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
