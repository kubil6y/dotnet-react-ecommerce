import { AxiosInstance } from "axios";
import { axiosInstance } from "./axiosInstance";
import { ProductRequests } from "./requests/ProductRequests";
import { TestErrorRequests } from "./requests/TestErrorRequests";

// Agent holds all application API requests with predefined configuration
class Agent {
  public readonly Products;
  public readonly TestErrors;

  constructor(instance: AxiosInstance) {
    this.Products = new ProductRequests(instance);
    this.TestErrors = new TestErrorRequests(instance);
  }
}

export const agent = new Agent(axiosInstance);
