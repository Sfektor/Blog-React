import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const regNewUser = createAsyncThunk(
  "registration/registrationNewUser",
  async function (newUser, { rejectWithValue }) {
    try {
      const response = await fetch("https://blog.kata.academy/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  email: "",
  token: "",
  status: null,
  isLoad: null,
  isError: null,
};

const registrationNewUser = createSlice({
  name: "registration",
  initialState,
  reducers: {
    getIsReg: (state, { payload: auth }) => {
      state.userName = auth?.userName;
      state.email = auth?.email;
      state.isAuth = auth?.isAuth;
      state.image = auth?.image;
      state.status = null;
      state.isLoad = null;
      state.isError = null;
    },
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: {
    [regNewUser.pending]: (state) => {
      state.status = "pending";
      state.isError = null;
      state.isLoad = true;
    },
    [regNewUser.fulfilled]: (state, { payload }) => {
      state.status = "resolved";
      state.email = payload?.user?.email;
      state.token = payload?.user?.token;
      state.isLoad = false;
    },
    [regNewUser.rejected]: (state) => {
      state.status = "rejected";
      state.isLoad = false;
      state.isError = true;
    },
  },
});

export const { actions, reducer } = registrationNewUser;
