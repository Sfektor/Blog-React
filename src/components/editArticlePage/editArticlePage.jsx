// Импорт стилей
import cls from "./editArticlePage.module.scss";
// Импорты react
import React from "react";
// Внутринние компоненты
import InsidesCreateEditArticle from "../UI/insidesCreareEditArticle/insidesCreateEditArticle";
import { Redirect } from "react-router-dom";

function EditArticlePage(props) {
  const isAuth = JSON.parse(localStorage.getItem("user"));
  if (isAuth?.isAuth) {
    return (
      <div className={cls.body}>
        <div className={cls.title}>Edit article</div>
        <InsidesCreateEditArticle edit slug={props.articleSlug} />
      </div>
    );
  } else return <Redirect to="/sign-in" />;
}

export default EditArticlePage;
