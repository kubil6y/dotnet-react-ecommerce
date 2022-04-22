export interface IBasket {
  id: 2;
  buyerId: string;
  items: IBasketItem[];
}

export interface IBasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}
