// Импорт стилей
import cls from "./articlePage.module.scss";
// Импорты react
import React, { useEffect } from "react";
// Внутринние компоненты
import InsidesArticle from "../UI/insidesArticle/insidesArticle";
import LoaderSpiner from "../UI/loaderSpiner/loaderSpiner";
import LoaderError from "../UI/loaderError/loaderError";
// Импорты redux
import { useSelector, useDispatch } from "react-redux";
import { fetchArticle } from "../../redux/getArticleSlice";
// Сторонние импорты
import Markdown from "react-markdown";

const ArticlePage = ({ articleSlug }) => {
  const { article } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticle(articleSlug));
  }, [dispatch, articleSlug]);

  const userLocStorage = JSON.parse(localStorage.getItem("user"));
  const userApi = article.article?.author?.username;
  const isAuth = userLocStorage?.userName === userApi;

  const printLoader = article.isLoad ? <LoaderSpiner /> : null;
  const printError = article.isError ? <LoaderError /> : null;

  const printArticle =
    !article.isLoad && article.isLoad !== null ? (
      <InsidesArticle buttonEditDelite={isAuth} one>
        {article.article}
      </InsidesArticle>
    ) : null;

  return (
    <div className={cls.wrapper}>
      {printLoader}
      {printError}
      {printArticle}
      <div className={cls.markdown}>
        <Markdown>{article.article.body}</Markdown>
      </div>
    </div>
  );
};

export default ArticlePage;
