import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authorizationUser = createAsyncThunk(
  "authorization/authorizationUser",
  async function (user, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://blog.kata.academy/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: JSON.parse(localStorage.getItem("Token")),
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userName: "",
  email: "",
  token: "",
  image: "",
  isAuth: null,
  status: null,
  isLoad: null,
  isError: null,
};

const authorization = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    getIsAuth: (state, { payload: auth }) => {
      state.userName = auth?.userName;
      state.email = auth?.email;
      state.isAuth = auth?.isAuth;
      state.image = auth?.image;
      state.status = null;
      state.isLoad = null;
      state.isError = null;
    },
  },
  extraReducers: {
    [authorizationUser.pending]: (state) => {
      state.status = "pending";
      state.isError = null;
      state.isLoad = true;
    },
    [authorizationUser.fulfilled]: (state, { payload }) => {
      state.isAuth = true;
      state.userName = payload?.user?.username;
      state.email = payload?.user?.email;
      state.token = payload?.user?.token;
      state.image = payload?.user?.image;
      state.status = "resolved";
      state.isLoad = false;
    },
    [authorizationUser.rejected]: (state) => {
      state.status = "rejected";
      state.isLoad = false;
      state.isError = true;
    },
  },
});

export const { actions, reducer } = authorization;
