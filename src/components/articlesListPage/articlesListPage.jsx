// Импорт стилей
import cls from "./articlesListPage.module.scss";
// Импорты react
import React, { useEffect } from "react";
// Импорты redux
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../redux/getArticlesSlice";
// Внутринние компоненты
import LoaderSpiner from "../UI/loaderSpiner/loaderSpiner";
import LoaderError from "../UI/loaderError/loaderError";
import InsidesArticle from "../UI/insidesArticle/insidesArticle";
import Pagination from "../pagination/pagination";

const ArticlesListPage = (props) => {
  const { articles } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticles(articles.page));
  }, [dispatch, articles.page]);

  const data = useSelector((state) => state.articles);

  const printLoader = data.isLoad ? <LoaderSpiner /> : null;
  const printError = data.isError ? <LoaderError /> : null;
  const printArticles = !data.isLoad
    ? data.articles.map((el) => (
        <InsidesArticle key={el.createdAt} showMiniDescription={true}>
          {el}
        </InsidesArticle>
      ))
    : null;

  return (
    <>
      <div className={cls.body}>
        {printLoader}
        {printError}
        {printArticles}
      </div>
      <Pagination />
    </>
  );
};

export default ArticlesListPage;
