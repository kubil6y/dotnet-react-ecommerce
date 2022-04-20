import { FC, useEffect, useState } from "react";
import { agent } from "../../app/api/Agent";
import { IProduct } from "../../app/models";
import { ProductList } from "./ProductList";

interface ICatalogProps {}

export const Catalog: FC<ICatalogProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    agent.Products.GetProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
