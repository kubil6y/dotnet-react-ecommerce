import { AxiosInstance } from "axios";
import { axiosInstance } from "./axiosInstance";
import { AccountRequests } from "./requests/AccountRequests";
import { BasketRequests } from "./requests/BasketRequests";
import { ProductRequests } from "./requests/ProductRequests";
import { TestErrorRequests } from "./requests/TestErrorRequests";

// Agent holds all application API requests with predefined configuration
class Agent {
  public readonly Products: ProductRequests;
  public readonly TestErrors: TestErrorRequests;
  public readonly Basket: BasketRequests;
  public readonly Account: AccountRequests;

  constructor(instance: AxiosInstance) {
    this.Products = new ProductRequests(instance);
    this.TestErrors = new TestErrorRequests(instance);
    this.Basket = new BasketRequests(instance);
    this.Account = new AccountRequests(instance);
  }
}

export const agent = new Agent(axiosInstance);
