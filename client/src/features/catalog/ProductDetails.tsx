import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingComponent } from "../../app/layout";
import { CustomFormat } from "../../app/utils";
import { NotFound } from "../../errors";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { removeBasketItemAsync, addItemToBasketAsync } from "../basket";
import { getProductAsync, productSelectors } from "./catalogSlice";

interface IProductDetailsProps {}

interface IParams {
  id: string;
}

export const ProductDetails: FC<IProductDetailsProps> = () => {
  const { id } = useParams<IParams>();
  const { basket, status: basketStatus } = useAppSelector(
    (state) => state.basket
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id)
  );
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(0);

  const item = basket?.items.find((item) => item.productId === product?.id);

  useEffect(() => {
    // if product exists on basket, update quantity state
    if (item) {
      setQuantity(item.quantity);
    }

    if (!product) {
      dispatch(getProductAsync(id));
    }
  }, [id, item, dispatch, product]);

  function handleInputChange(e: any) {
    if (parseInt(e.target.value) > 0) {
      setQuantity(parseInt(e.target.value));
    }
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addItemToBasketAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus === "pendingGetProduct") {
    return <LoadingComponent message="Loading product details..." />;
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {CustomFormat.Currency(product.price)}
        </Typography>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{product.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{product.description}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>{product.type}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Quantity in stock</TableCell>
              <TableCell>{product.quantityInStock}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={item?.quantity === quantity || quantity === 0}
              onClick={handleUpdateCart}
              loading={basketStatus.includes("pending")}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
