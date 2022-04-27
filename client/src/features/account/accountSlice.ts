import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { agent } from "../../app/api/Agent";
import { IUser } from "../../app/models";
import { history } from "../../index";
import { setBasket } from "../basket";

interface IAccountState {
  user: IUser | null;
}

const initialState: IAccountState = {
  user: null,
};

export const loginAsync = createAsyncThunk<IUser, FieldValues>(
  "account/loginAsync",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.Login(data);
      const { basket, ...user } = userDto;
      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/catalog");
      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

// getCurrentUserAsync will only execute if we have localStorage user
export const getCurrentUserAsync = createAsyncThunk<IUser, void>(
  "account/loginAsync",
  async (_, thunkAPI) => {
    try {
      const userLocalStorage = JSON.parse(localStorage.getItem("user")!);
      thunkAPI.dispatch(setUser(userLocalStorage));

      const userDto = await agent.Account.GetCurrentUser();
      const { basket, ...user } = userDto;
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) {
        return false;
      }
      return true;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      history.push("/");
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCurrentUserAsync.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Session expired. Please login again.");
      history.push("/");
    });

    builder.addMatcher(isAnyOf(loginAsync.rejected), (_, action) => {
      console.log(action.payload);
    });

    builder.addMatcher(
      isAnyOf(loginAsync.fulfilled, getCurrentUserAsync.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const { logout, setUser } = accountSlice.actions;
