// Импорт стилей
import cls from "./app.module.scss";
// Импорты react
import React, { useEffect } from "react";
// Импорты redux
import { useSelector, useDispatch } from "react-redux";
// Импорты router
import { BrowserRouter as Router, Route } from "react-router-dom";
// Собств. хуки
import { useActions } from "../../hooks/useAction";
// Внутринние компоненты
import Header from "../header/header";
import ArticlePage from "../articlePage/articlePage";
import ArticlesListPage from "../articlesListPage/articlesListPage";
import SignInPage from "../signInPage/signInPage";
import SignUpPage from "../signUpPage/signUpPage";
import ProfilePage from "../profilePage/profilePage";
import CreateArticlePage from "../createArticlePage/createArticlePage";
import EditArticlePage from "../editArticlePage/editArticlePage";

const App = () => {
  const { articles, ...data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { getIsAuth } = useActions();

  useEffect(() => {
    getIsAuth(JSON.parse(localStorage.getItem("user")));
  }, [
    dispatch,
    getIsAuth,
    articles.page,
    data.deleteArticle,
    data.editArticle,
    data.postArticle,
    data.edit,
    data.like,
  ]);

  return (
    <div className={cls.wrapper}>
      <Router>
        <Header />
        <Route path="/" component={ArticlesListPage} exact />
        <Route path="/articles/" component={ArticlesListPage} exact />
        <Route
          path={`/articles/:id/`}
          render={({ match }) => {
            const { id } = match.params;
            return <ArticlePage articleSlug={id} />;
          }}
          exact
        />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/new-article" component={CreateArticlePage} />
        <Route
          path="/articles/:id/edit"
          render={({ match }) => {
            const { id } = match.params;
            return <EditArticlePage articleSlug={id} />;
          }}
        />
      </Router>
    </div>
  );
};

export default App;
