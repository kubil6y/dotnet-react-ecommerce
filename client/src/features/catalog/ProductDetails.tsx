import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { agent } from "../../app/api/Agent";
import { LoadingComponent } from "../../app/layout";
import { IProduct } from "../../app/models";
import { formatCurrency } from "../../app/utils";
import { NotFound } from "../../errors";

interface IProductDetailsProps {}

interface IParams {
  id: string;
}

export const ProductDetails: FC<IProductDetailsProps> = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<IParams>();

  useEffect(() => {
    agent.Products.GetProduct(id)
      .then((data) => setProduct(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

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
      </Grid>
    </Grid>
  );
};
