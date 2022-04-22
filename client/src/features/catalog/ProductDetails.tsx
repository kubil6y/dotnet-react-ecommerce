import { LoadingButton } from "@mui/lab";
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
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { agent } from "../../app/api/Agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingComponent } from "../../app/layout";
import { IProduct } from "../../app/models";
import { formatCurrency } from "../../app/utils";
import { NotFound } from "../../errors";

interface IProductDetailsProps {}

interface IParams {
  id: string;
}

export const ProductDetails: FC<IProductDetailsProps> = () => {
  const { id } = useParams<IParams>();
  const { basket, setBasket } = useStoreContext();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true); // for getting product

  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false); // adding/updating to cart

  const item = basket?.items.find((item) => item.productId === product?.id);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }

    agent.Products.GetProduct(id)
      .then((data) => setProduct(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddBasketItem(productId: number) {
    if (quantity === 0) {
      toast.info("Quantity should be at least one :)");
      return;
    }

    setSubmitting(true);
    agent.Basket.AddItemToBasket(productId, quantity)
      .then((basket) => setBasket(basket))
      .catch((err) => console.log(err))
      .finally(() => setSubmitting(false));
  }

  if (loading) {
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
          {formatCurrency(product.price)}
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
              onChange={(e) => setQuantity(+e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              onClick={() => handleAddBasketItem(product.id)}
              loading={submitting}
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
