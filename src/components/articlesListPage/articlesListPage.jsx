// Импорт стилей
import cls from "./articlesListPage.module.scss";
// Импорты react
import React from "react";
// Импорты redux
import { useSelector } from "react-redux";
// Внутринние компоненты
import LoaderSpiner from "../UI/loaderSpiner/loaderSpiner";
import LoaderError from "../UI/loaderError/loaderError";
import ArticleCard from "../articleCart/articleCart";
import Pagination from "../pagination/pagination";

function ArticlesListPage(props) {
  const { articles } = useSelector((state) => state);

  const printLoader = articles.isLoad ? <LoaderSpiner /> : null;
  const printError = articles.isError ? <LoaderError /> : null;
  const printArticles = !articles.isLoad ? <ArticleCard /> : null;
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
}

export default ArticlesListPage;
