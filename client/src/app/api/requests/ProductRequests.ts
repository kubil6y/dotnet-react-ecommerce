import { AxiosInstance } from "axios";
import { BaseRequests } from "./BaseRequests";

export class ProductRequests extends BaseRequests {
  constructor(instance: AxiosInstance) {
    super(instance);
  }

  public GetProducts = () => {
    return this.Get("/products");
  };

  public GetProduct = (id: string) => {
    return this.Get(`/products/${id}`);
  };
}
