import { BaseRequests } from "./BaseRequests";

export class ProductRequests extends BaseRequests {
  public GetProducts = () => {
    return this.Get("/products");
  };

  public GetProduct = (id: string) => {
    return this.Get(`/products/${id}`);
  };
}
