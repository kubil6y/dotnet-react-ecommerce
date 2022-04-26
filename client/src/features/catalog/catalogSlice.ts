import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { agent } from "../../app/api/Agent";
import { IMetaData, IProduct, IProductParams } from "../../app/models";
import { RootState } from "../../app/store";

interface ICatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: IProductParams;
  metaData: IMetaData | null;
}

const productsAdapter = createEntityAdapter<IProduct>();

function getAxiosParams(productParams: IProductParams): URLSearchParams {
  const params = new URLSearchParams();
  params.append("pageNumber", String(productParams.pageNumber));
  params.append("pageSize", String(productParams.pageSize));
  params.append("orderBy", productParams.orderBy);

  if (productParams.searchTerm) {
    params.append("searchTerm", productParams.searchTerm);
  }

  if (productParams.brands.length > 0) {
    params.append("brands", String(productParams.brands));
  }

  if (productParams.types.length > 0) {
    params.append("types", String(productParams.types));
  }

  return params;
}

export const getProductsAsync = createAsyncThunk<
  IProduct[],
  void,
  { state: RootState }
>("catalog/getProductsAsync", async (_, thunkAPI) => {
  try {
    const stateProductParams = thunkAPI.getState().catalog.productParams;
    const params = getAxiosParams(stateProductParams);
    const response = await agent.Products.GetProducts(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

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

interface IGetFilters {
  brands: string[];
  types: string[];
}

export const getFiltersAsync = createAsyncThunk<IGetFilters>(
  "catalog/getCatalogTypes",
  async (_, thunkAPI) => {
    try {
      return await agent.Products.GetFilters();
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

function initProductParams() {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: "name",
    brands: [],
    types: [],
  };
}

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<ICatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initProductParams(),
    metaData: null,
  }),

  reducers: {
    setProductParams: (
      state,
      action: PayloadAction<Partial<IProductParams>>
    ) => {
      // in Catalog.tsx if(!productsLoaded) dispatch(...) fetches our products
      // we use productsLoaded to trigger another request by setting it to false
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },

    resetProductParams: (state) => {
      state.productParams = initProductParams();
    },

    setMetaData: (state, action: PayloadAction<IMetaData>) => {
      state.metaData = action.payload;
    },

    setPageNumber: (state, action: PayloadAction<number>) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        pageNumber: action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    // ---------- getProductsAsync ---------- //
    builder.addCase(getProductsAsync.pending, (state) => {
      state.status = "pendingGetProducts";
    });

    builder.addCase(getProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });

    builder.addCase(getProductsAsync.rejected, (state, action) => {
      console.log(action.payload); // TODO
      state.status = "idle";
    });

    // ---------- getProductAsync ---------- //
    builder.addCase(getProductAsync.pending, (state) => {
      state.status = "pendingGetProduct";
    });

    builder.addCase(getProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });

    builder.addCase(getProductAsync.rejected, (state, action) => {
      console.log(action.payload); // TODO
      state.status = "idle";
    });

    // ---------- getProductAsync ---------- //
    builder.addCase(getFiltersAsync.pending, (state) => {
      state.status = "pendingGetFiltersAsync";
    });

    builder.addCase(getFiltersAsync.fulfilled, (state, action) => {
      state.filtersLoaded = true;
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.status = "idle";
    });

    builder.addCase(getFiltersAsync.rejected, (state, action) => {
      console.log(action.payload); // TODO
      state.status = "idle";
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = catalogSlice.actions;
