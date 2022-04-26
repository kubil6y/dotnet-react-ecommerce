import { BaseRequests } from "./BaseRequests";

export class ProductRequests extends BaseRequests {
  public GetProducts = (params: URLSearchParams) => {
    return this.Get("/products", params);
  };

  public GetProduct = (id: string) => {
    return this.Get(`/products/${id}`);
  };

  public GetFilters = () => {
    return this.Get("/products/filters");
  };
}
