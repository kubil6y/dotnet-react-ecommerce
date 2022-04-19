import axios from "axios";
import { FC, useEffect, useState } from "react";
import { IProduct } from "../../app/models";
import { ProductList } from "./ProductList";

interface ICatalogProps {}

export const Catalog: FC<ICatalogProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
