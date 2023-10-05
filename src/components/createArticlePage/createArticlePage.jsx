// Импорт стилей
import cls from "./createArticlePage.module.scss";
// Импорты react
import React from "react";
// Внутринние компоненты
import InsidesCreateEditArticle from "../UI/insidesCreareEditArticle/insidesCreateEditArticle";
import { Redirect } from "react-router-dom";

function CreateArticlePage(props) {
  const isAuth = JSON.parse(localStorage.getItem("user"));
  // JSON.stringify(localStorage.setItem("article", ""));
  if (isAuth?.isAuth) {
    return (
      <div className={cls.body}>
        <div className={cls.title}>Create new article</div>
        <InsidesCreateEditArticle />
      </div>
    );
  } else return <Redirect to="/sign-in" />;
}

export default CreateArticlePage;
