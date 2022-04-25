import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { agent } from "../../app/api/Agent";
import { IProduct } from "../../app/models";
import { RootState } from "../../app/store";

const productsAdapter = createEntityAdapter<IProduct>();

export const getProductsAsync = createAsyncThunk<IProduct[]>(
  "catalog/getProductsAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Products.GetProducts();
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

export const getProductAsync = createAsyncThunk<IProduct, string>(
  "catalog/getProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Products.GetProduct(productId);
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.pending, (state) => {
      state.status = "pendingGetProducts";
    });

    builder.addCase(getProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });

    builder.addCase(getProductsAsync.rejected, (state) => {
      state.status = "idle";
    });

    builder.addCase(getProductAsync.pending, (state) => {
      state.status = "pendingGetProduct";
    });

    builder.addCase(getProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });

    builder.addCase(getProductAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);
