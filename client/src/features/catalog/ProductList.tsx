import { Grid } from "@mui/material";
import { FC } from "react";
import { IProduct } from "../../app/models";
import { useAppSelector } from "../../app/store";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface IProductListProps {
  products: IProduct[];
}

export const ProductList: FC<IProductListProps> = ({ products }) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {productsLoaded ? (
            <ProductCard product={product} />
          ) : (
            <ProductCardSkeleton />
          )}
        </Grid>
      ))}
    </Grid>
  );
};
