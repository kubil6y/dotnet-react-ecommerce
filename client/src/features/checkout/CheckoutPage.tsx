import { Typography } from "@mui/material";
import { FC } from "react";

interface ICheckoutPageProps {}

export const CheckoutPage: FC<ICheckoutPageProps> = () => {
  return (
    <Typography variant="h3">
      Only logged in users should be able to see this!
    </Typography>
  );
};
