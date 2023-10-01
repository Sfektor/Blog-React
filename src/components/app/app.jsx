// Импорт стилей
import cls from "./app.module.scss";
// Внутринние компоненты
import Header from "../header/header";

import ArticlePage from "../articlePage/articlePage";
// Импорты react
import React, { useEffect } from "react";
// Импорты redux
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles } from "../../redux/getArticlesSlice";
// Импорты router
import { BrowserRouter as Router, Route } from "react-router-dom";
import ArticlesListPage from "../articlesListPage/articlesListPage";

const App = () => {
  const { articles } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(articles.page));
  }, [dispatch, articles.page]);

  return (
    <div className={cls.wrapper}>
      <Router>
        <Header />
        <Route path="/" component={ArticlesListPage} exact />
        <Route path="/articles/" component={ArticlesListPage} exact />
        <Route
          path={`/articles/:id`}
          render={({ match }) => {
            const { id } = match.params;
            return <ArticlePage articleSlug={id} />;
          }}
        />
      </Router>
    </div>
  );
};

export default App;
