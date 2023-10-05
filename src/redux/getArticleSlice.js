import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  async function (slug, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          method: "GET",
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

export const likeArticle = createAsyncThunk(
  "articles/likeArticle",
  async function (props, { rejectWithValue, dispatch }) {
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
      dispatch(toggleLike());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  article: [],
  status: null,
  isLoad: null,
  isError: null,
};

const getArticleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    toggleLike(state) {
      state.article.favoritesCount = state.article.favorited
        ? state.article.favoritesCount - 1
        : state.article.favoritesCount + 1;
      state.article.favorited = !state.article.favorited;
    },
  },
  extraReducers: {
    [fetchArticle.pending]: (state) => {
      state.status = "pending";
      state.isError = null;
      state.isLoad = true;
    },
    [fetchArticle.fulfilled]: (state, { payload }) => {
      state.status = "resolved";
      state.article = payload.article;
      state.isLoad = false;
    },
    [fetchArticle.rejected]: (state) => {
      state.status = "rejected";
      state.isLoad = false;
      state.isError = true;
    },
  },
});

export const { toggleLike } = getArticleSlice.actions;

export const { actions, reducer } = getArticleSlice;
