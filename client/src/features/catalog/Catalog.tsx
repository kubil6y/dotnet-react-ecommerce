import { FC, useEffect, useState } from "react";
import { agent } from "../../app/api/Agent";
import { LoadingComponent } from "../../app/layout";
import { IProduct } from "../../app/models";
import { ProductList } from "./ProductList";

interface ICatalogProps {}

export const Catalog: FC<ICatalogProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Products.GetProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingComponent message="Loading products..." />;
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
