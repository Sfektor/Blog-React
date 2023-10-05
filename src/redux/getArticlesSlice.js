import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async function (page, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/?limit=5&offset=${
          page === 1 ? 0 : page * 5 - 5
        }`,
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

export const likeArticles = createAsyncThunk(
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
      dispatch(toggleLike(data));
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
  isLoad: null,
  isLoaded: null,
  isError: null,
};

const setPending = (state) => {
  state.isLoad = true;
  state.isError = false;
  state.isLoaded = false;
};

const setFulfilled = (state) => {
  state.isLoad = false;
  state.isLoaded = true;
  state.isError = false;
};

const setError = (state) => {
  state.isLoad = false;
  state.isLoaded = false;
  state.isError = true;
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
    toggleLike(state, { payload }) {
      const toggleFavorite = state.articles.find(
        (el) => el.slug === payload.article.slug
      );

      toggleFavorite.favoritesCount = toggleFavorite.favorited
        ? toggleFavorite.favoritesCount - 1
        : toggleFavorite.favoritesCount + 1;
      toggleFavorite.favorited = !toggleFavorite.favorited;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: setPending,

    [fetchArticles.fulfilled]: (state, { payload }) => {
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
      setFulfilled(state);
    },

    [fetchArticles.rejected]: setError,
  },
});

const { toggleLike } = getArticlesSlice.actions;

export const { actions, reducer } = getArticlesSlice;
