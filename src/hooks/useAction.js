import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as actionsArticles } from "../redux/getArticlesSlice";
import { actions as actionsAuthorization } from "../redux/postAuthorizationSlice";
import { actions as actionsEdit } from "../redux/putEditUserSlice";
import { actions as actionsRegistration } from "../redux/postRegistrationSlice";
import { actions as like } from "../redux/likeArticleSlice";

const rootActions = {
  ...actionsArticles,
  ...actionsAuthorization,
  ...actionsEdit,
  ...actionsRegistration,
  ...like,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
