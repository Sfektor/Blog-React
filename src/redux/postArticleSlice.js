import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postArticle = createAsyncThunk(
  "article/postArticle",
  async function (article, { rejectWithValue }) {
    try {
      const response = await fetch("https://blog.kata.academy/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${JSON.parse(localStorage.getItem("Token"))}`,
        },
        body: JSON.stringify(article),
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
  status: null,
  isLoad: null,
  isError: null,
};

const article = createSlice({
  name: "article",
  initialState,
  reducers: {
    resetStatusPostArticle: (state) => {
      state.status = null;
    },
  },
  extraReducers: {
    [postArticle.pending]: (state) => {
      state.status = "pending";
      state.isError = null;
      state.isLoad = true;
    },
    [postArticle.fulfilled]: (state) => {
      state.status = "resolved";
      state.isLoad = false;
      state.isError = false;
    },
    [postArticle.rejected]: (state) => {
      state.status = "rejected";
      state.isLoad = false;
      state.isError = true;
    },
  },
});

export const { actions, reducer } = article;
