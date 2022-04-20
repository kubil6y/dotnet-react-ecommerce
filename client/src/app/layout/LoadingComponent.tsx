import { FC } from "react";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface ILoadingComponentProps {
  message?: string;
}

export const LoadingComponent: FC<ILoadingComponentProps> = ({
  message = "Loading...",
}) => {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={100} color="secondary" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};
