import {
  Button,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import { CustomFormat } from "../../app/utils";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LoadingButton } from "@mui/lab";
import { BasketSummary } from "./BasketSummary";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { removeBasketItemAsync, addItemToBasketAsync } from "./basketSlice";

interface IBasketPageProps {}

export const BasketPage: FC<IBasketPageProps> = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { basket, status: basketStatus } = useAppSelector(
    (state) => state.basket
  );

  let itemCount = 0;
  if (basket) {
    itemCount = basket.items.reduce((accumulated, current) => {
      return accumulated + current.quantity;
    }, 0);
  }

  if (!basket || itemCount === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" textAlign="center" gutterBottom>
          Your basket is empty
        </Typography>
        <Button variant="contained" component={Link} to="/catalog">
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <img
                      onClick={() => history.push(`/catalog/${item.productId}`)}
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20, cursor: "pointer" }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {CustomFormat.Currency(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      basketStatus ===
                      "pendingRemoveItem" + item.productId + "rem"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                  >
                    <RemoveIcon />
                  </LoadingButton>

                  {item.quantity}

                  <LoadingButton
                    loading={basketStatus === "pendingAddItem" + item.productId}
                    color="secondary"
                    onClick={() =>
                      dispatch(
                        addItemToBasketAsync({
                          productId: item.productId,
                          quantity: 1,
                        })
                      )
                    }
                  >
                    <AddIcon />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {CustomFormat.Subtotal(item.price, item.quantity)}
                </TableCell>

                <TableCell align="right">
                  <LoadingButton
                    loading={
                      basketStatus ===
                      "pendingRemoveItem" + item.productId + "del"
                    }
                    color="error"
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                  >
                    <DeleteIcon />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
