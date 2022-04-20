import { Grid } from "@mui/material";
import { FC } from "react";
import { IProduct } from "../../app/models";
import { ProductCard } from "./ProductCard";

interface IProductListProps {
  products: IProduct[];
}

export const ProductList: FC<IProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={6} sm={4} md={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
