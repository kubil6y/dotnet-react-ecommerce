import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { agent } from "../../app/api/Agent";
import { IBasket } from "../../app/models";
import { getCookie } from "../../app/utils";

interface IBasketState {
  basket: IBasket | null;
  status: string;
}

const initialState: IBasketState = {
  basket: null,
  status: "idle",
};

interface IAddItemToBasketAsyncInput {
  productId: number;
  quantity: number;
}

export const addItemToBasketAsync = createAsyncThunk<
  IBasket /* return type */,
  IAddItemToBasketAsyncInput /* input type */
>("basket/addItemToBasketAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    return await agent.Basket.AddItemToBasket(productId, quantity);
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

interface IRemoveBasketItemAsyncInput {
  productId: number;
  quantity: number;
  name?: string;
}

export const removeBasketItemAsync = createAsyncThunk<
  void,
  IRemoveBasketItemAsyncInput
>("basket/removeBasketItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    return await agent.Basket.RemoveBasketItem(productId, quantity);
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

export const getBasketAsync = createAsyncThunk<IBasket>(
  "basket/getBasketAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Basket.GetBasket();
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  },
  {
    condition: () => {
      if (!getCookie("buyerId")) {
        return false;
      }
      return true;
    },
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<IBasket>) => {
      state.basket = action.payload;
    },

    clearBasket: (state) => {
      state.basket = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addItemToBasketAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });

    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      // name? property is set for LoadingButton loading
      state.status =
        "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });

    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      state.status = "pendingRemoveItem" + action.meta.arg.productId;
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (item) => item.productId === productId
      );

      // Check if item is not in the basket
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity;

      if (state.basket!.items[itemIndex].quantity <= 0) {
        state.basket?.items.splice(itemIndex, 1);
      }

      state.status = "idle";
    });

    builder.addCase(removeBasketItemAsync.rejected, (state) => {
      state.status = "idle";
    });

    builder.addMatcher(
      isAnyOf(addItemToBasketAsync.fulfilled, getBasketAsync.fulfilled),
      (state, action) => {
        state.basket = action.payload;
        state.status = "idle";
      }
    );

    builder.addMatcher(
      isAnyOf(addItemToBasketAsync.rejected, getBasketAsync.rejected),
      (state) => {
        state.status = "idle";
      }
    );
  },
});

export const { setBasket, clearBasket } = basketSlice.actions;
