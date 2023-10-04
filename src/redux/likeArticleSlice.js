import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postLikeArticle = createAsyncThunk(
  "likeArticle/postLikeArticle",
  async function (props, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${props.slug}/favorite`,
        {
          method: `${!props.favorited ? "POST" : "DELETE"}`,
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
  status: "resolved",
  isError: null,
};

const likeArticle = createSlice({
  name: "likeArticle",
  initialState,
  extraReducers: {
    [postLikeArticle.pending]: (state) => {
      state.status = "pending";
    },
    [postLikeArticle.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [postLikeArticle.rejected]: (state) => {
      state.status = "rejected";
      state.isError = true;
    },
  },
});

export const { actions, reducer } = likeArticle;
