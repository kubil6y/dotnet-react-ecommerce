import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { FC } from "react";
import { formatCurrency } from "../../app/utils";
import { useStoreContext } from "../../app/context/StoreContext";

interface IBasketSummaryProps {}

export const BasketSummary: FC<IBasketSummaryProps> = () => {
  const { basket } = useStoreContext();

  const subTotal =
    basket?.items.reduce((accumulated, current) => {
      return accumulated + current.price * current.quantity;
    }, 0) ?? 0;

  // 10000 is 100$, 500 is 5$
  const deliveryFee = subTotal > 10000 ? 0 : 500;
  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{formatCurrency(subTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{formatCurrency(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {formatCurrency(subTotal + deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
