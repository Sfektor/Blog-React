import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as articlesReducer } from "./getArticlesSlice";
import { reducer as articleReducer } from "./getArticleSlice";
import { reducer as postRegistrationReducer } from "./postRegistrationSlice";
import { reducer as postAuthorizationReducer } from "./postAuthorizationSlice";
import { reducer as putEditUser } from "./putEditUserSlice";
import { reducer as likeArticle } from "./likeArticleSlice";

const redusers = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  regisration: postRegistrationReducer,
  authorization: postAuthorizationReducer,
  edit: putEditUser,
  like: likeArticle,
});

export default configureStore({
  reducer: redusers,
});
