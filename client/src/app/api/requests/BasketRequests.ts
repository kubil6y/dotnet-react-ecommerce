import { IBasket } from "../../models";
import { BaseRequests } from "./BaseRequests";

export class BasketRequests extends BaseRequests {
  public GetBasket = (): Promise<IBasket> => {
    return this.Get("/basket");
  };

  public AddItemToBasket = (productId: number, quantity: number = 1) => {
    return this.Post(`/basket?productId=${productId}&quantity=${quantity}`, {});
  };

  public RemoveBasketItem = (productId: number, quantity: number = 1) => {
    return this.Delete(`/basket?productId=${productId}&quantity=${quantity}`);
  };
}
