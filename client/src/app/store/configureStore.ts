import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { accountSlice } from "../../features/account";
import { basketSlice } from "../../features/basket";
import { catalogSlice } from "../../features/catalog";

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    catalog: catalogSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*
NOTES
- await promise calls on createAsyncThunk functions
- remember to rejectWithValue in createAsyncThunk functions, the reason for this
	is that its an inner function so we have to return value otherwise its lost.
- make use of adapters
*/
