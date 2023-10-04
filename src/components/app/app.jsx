// Импорт стилей
import cls from "./app.module.scss";
// Внутринние компоненты
import Header from "../header/header";
import ArticlePage from "../articlePage/articlePage";
import ArticlesListPage from "../articlesListPage/articlesListPage";
import SignInPage from "../signInPage/signInPage";
import SignUpPage from "../signUpPage/signUpPage";
import ProfilePage from "../profilePage/profilePage";
// Импорты react
import React, { useEffect } from "react";
// Импорты redux
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles } from "../../redux/getArticlesSlice";
// Импорты router
import { BrowserRouter as Router, Route } from "react-router-dom";
// Собств. хуки
import { useActions } from "../../hooks/useAction";

const App = () => {
  const { articles } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { getIsAuth } = useActions();

  useEffect(() => {
    dispatch(fetchArticles(articles.page));
    getIsAuth(JSON.parse(localStorage.getItem("user")));
  }, [dispatch, articles.page, getIsAuth]);

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
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/profile" component={ProfilePage} />
      </Router>
    </div>
  );
};

export default App;
