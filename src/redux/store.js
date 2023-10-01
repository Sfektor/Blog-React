import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as articlesReducer } from "./getArticlesSlice";
import { reducer as articleReducer } from "./getArticleSlice";

const redusers = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
});

export default configureStore({
  reducer: redusers,
});
