import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const editArticle = createAsyncThunk(
  "editArticle/editArticleFunc",
  async function (putRes, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${putRes.slug}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("Token"))}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(putRes.res),
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
  status: null,
  isLoad: null,
  isError: null,
};

const editArticleSlice = createSlice({
  name: "editArticle",
  initialState,
  reducers: {
    resetStatusEditArticle: (state) => {
      state.status = null;
    },
  },
  extraReducers: {
    [editArticle.pending]: (state) => {
      state.status = "pending";
      state.isError = false;
      state.isLoad = true;
    },
    [editArticle.fulfilled]: (state) => {
      state.isAuth = false;
      state.status = "resolved";
      state.isLoad = false;
    },
    [editArticle.rejected]: (state) => {
      state.status = "rejected";
      state.isLoad = false;
      state.isError = true;
    },
  },
});

export const { actions, reducer } = editArticleSlice;
