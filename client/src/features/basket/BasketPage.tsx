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
import { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { formatCurrency, formatSubtotal } from "../../app/utils";
import { useStoreContext } from "../../app/context/StoreContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { agent } from "../../app/api/Agent";
import { LoadingButton } from "@mui/lab";
import { BasketSummary } from "./BasketSummary";

interface IBasketPageProps {}

export const BasketPage: FC<IBasketPageProps> = () => {
  const history = useHistory();

  const { basket, setBasket, removeBasketItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  function handleRemoveBasketItem(
    productId: number,
    quantity: number,
    name: string
  ) {
    setStatus({
      loading: true,
      name,
    });
    agent.Basket.RemoveBasketItem(productId, quantity)
      .then(() => removeBasketItem(productId, quantity))
      .catch((err) => console.log(err))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function handleAddBasketItem(
    productId: number,
    quantity: number,
    name: string
  ) {
    setStatus({
      loading: true,
      name,
    });
    agent.Basket.AddItemToBasket(productId, quantity)
      .then((basket) => setBasket(basket))
      .catch((err) => console.log(err))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

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
                  {formatCurrency(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === "remove:" + item.productId
                    }
                    onClick={() =>
                      handleRemoveBasketItem(
                        item.productId,
                        1,
                        "remove:" + item.productId
                      )
                    }
                  >
                    <RemoveIcon />
                  </LoadingButton>

                  {item.quantity}

                  <LoadingButton
                    loading={
                      status.loading && status.name === "add:" + item.productId
                    }
                    color="secondary"
                    onClick={() =>
                      handleAddBasketItem(
                        item.productId,
                        1,
                        "add:" + item.productId
                      )
                    }
                  >
                    <AddIcon />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {formatSubtotal(item.price, item.quantity)}
                </TableCell>

                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === "destroy:" + item.productId
                    }
                    color="error"
                    onClick={() =>
                      handleRemoveBasketItem(
                        item.productId,
                        item.quantity,
                        "destroy:" + item.productId
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
        </Grid>
      </Grid>
    </>
  );
};
