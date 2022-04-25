import { createContext, PropsWithChildren, useContext, useState } from "react";
import { IBasket } from "../models";

interface IStoreContextValue {
  basket: IBasket | null;
  setBasket: (basket: IBasket) => void;
  removeBasketItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<IStoreContextValue | undefined>(
  undefined
);

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("Please wrap your component inside StoreContextProvider");
  }
  return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<IBasket | null>(null);

  function removeBasketItem(productId: number, quantity: number) {
    if (!basket) return;
    const items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.productId === productId);
    if (itemIndex === -1) return;

    items[itemIndex].quantity -= quantity;

    if (items[itemIndex].quantity <= 0) {
      items.splice(itemIndex, 1);
    }

    setBasket((prev) => {
      return { ...prev!, items };
    });
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeBasketItem }}>
      {children}
    </StoreContext.Provider>
  );
}
