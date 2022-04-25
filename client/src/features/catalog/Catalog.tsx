import { FC, useEffect } from "react";
import { LoadingComponent } from "../../app/layout";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getProductsAsync, productSelectors } from "./catalogSlice";
import { ProductList } from "./ProductList";

interface ICatalogProps {}

export const Catalog: FC<ICatalogProps> = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status: productsStatus } = useAppSelector(
    (state) => state.catalog
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(getProductsAsync());
    }
  }, [dispatch, productsLoaded]);

  if (productsStatus === "pendingGetProducts") {
    return <LoadingComponent message="Loading products..." />;
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
