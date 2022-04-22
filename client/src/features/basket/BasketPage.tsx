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
  IconButton,
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

interface IBasketPageProps {}

export const BasketPage: FC<IBasketPageProps> = () => {
  const history = useHistory();

  const { basket, setBasket, removeBasketItem } = useStoreContext();
  const [loading, setLoading] = useState(false);

  function handleRemoveBasketItem(productId: number, quantity: number) {
    setLoading(true);
    agent.Basket.RemoveBasketItem(productId, quantity)
      .then(() => removeBasketItem(productId, quantity))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleAddBasketItem(productId: number, quantity: number) {
    setLoading(true);
    agent.Basket.AddItemToBasket(productId, quantity)
      .then((basket) => setBasket(basket))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  if (!basket) {
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
              <TableCell align="right">{formatCurrency(item.price)}</TableCell>
              <TableCell align="center">
                <LoadingButton
                  loading={loading}
                  onClick={() => handleRemoveBasketItem(item.productId, 1)}
                >
                  <RemoveIcon />
                </LoadingButton>

                {item.quantity}

                <LoadingButton
                  loading={loading}
                  color="secondary"
                  onClick={() => handleAddBasketItem(item.productId, 1)}
                >
                  <AddIcon />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">
                {formatSubtotal(item.price, item.quantity)}
              </TableCell>

              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() =>
                    handleRemoveBasketItem(item.productId, item.quantity)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface IRemoveItemButtonProps {}

const RemoveItemButton: FC<IRemoveItemButtonProps> = () => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingButton
      loading={loading}
      onClick={() => console.log("remove item button")}
    >
      <RemoveIcon />
    </LoadingButton>
  );
};

interface IAddItemButtonProps {}

const AddItemButton: FC<IAddItemButtonProps> = () => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingButton
      loading={loading}
      onClick={() => console.log("add item button")}
    >
      <RemoveIcon />
    </LoadingButton>
  );
};
