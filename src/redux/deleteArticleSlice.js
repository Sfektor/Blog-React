import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteArticle = createAsyncThunk(
  "deleteArticle/registrationNewUser",
  async function (slug, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("Token"))}`,
          },
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

const deleteArticleSlice = createSlice({
  name: "deleteArticle",
  initialState,
  reducers: {
    resetStatusDeleteArticle: (state) => {
      state.status = null;
    },
  },
  extraReducers: {
    [deleteArticle.pending]: (state) => {
      state.status = "pending";
      state.isError = false;
    },
    [deleteArticle.fulfilled]: (state) => {
      state.status = "resolved";
      state.isLoad = false;
      state.isError = false;
    },
    [deleteArticle.rejected]: (state) => {
      state.status = "rejected";
      state.isLoad = false;
      state.isError = true;
    },
  },
});

const resetStatusDeleteArticle = deleteArticleSlice.actions;

export const { actions, reducer } = deleteArticleSlice;
