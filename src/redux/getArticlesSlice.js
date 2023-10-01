import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async function (page, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/?limit=5&offset=${page}`
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
  articles: [],
  articleSlug: "",
  articlesCount: 0,
  page: 1,
  status: null,
  isLoad: null,
  isError: null,
};

const getArticlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    getPage: (state, { payload: page }) => {
      state.page = page;
    },
    getSlug: (state, { payload: slug }) => {
      state.articleSlug = slug;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = "pending";
      state.isError = null;
      state.isLoad = true;
    },
    [fetchArticles.fulfilled]: (state, { payload }) => {
      state.status = "resolved";
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
      state.isLoad = false;
    },
    [fetchArticles.rejected]: (state) => {
      state.status = "rejected";
      state.isLoad = false;
      state.isError = true;
    },
  },
});

export const { actions, reducer } = getArticlesSlice;
