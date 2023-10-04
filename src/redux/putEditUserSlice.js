import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const editUser = createAsyncThunk(
  "editUser/registrationNewUser",
  async function (editUser, { rejectWithValue }) {
    try {
      const response = await fetch("https://blog.kata.academy/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${JSON.parse(localStorage.getItem("Token"))}`,
        },
        body: JSON.stringify(editUser),
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
  userName: "",
  email: "",
  token: "",
  image: "",
  isAuth: true,
  status: null,
  isLoad: null,
  isError: null,
};

const editUserNew = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    getIsEdit: (state, { payload: auth }) => {
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
    [editUser.pending]: (state) => {
      state.status = "pending";
      state.isError = null;
      state.isLoad = true;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.isAuth = false;
      state.userName = payload?.user?.username;
      state.email = payload?.user?.email;
      state.token = payload?.user?.token;
      state.image = payload?.user?.image;
      state.status = "resolved";
      state.isLoad = false;
    },
    [editUser.rejected]: (state) => {
      state.status = "rejected";
      state.isLoad = false;
      state.isError = true;
    },
  },
});

export const { actions, reducer } = editUserNew;
