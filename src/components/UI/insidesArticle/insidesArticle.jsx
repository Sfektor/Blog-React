// Импорт стилей
import cls from "./insidesArticle.module.scss";
// Импорты React
import React from "react";
// Внешние импорты
import { format } from "date-fns";
// Собственные хуки
import { useActions } from "../../../hooks/useAction";
// Импорты router
import { Link, useHistory } from "react-router-dom";
// Импорты redux
import { useSelector, useDispatch } from "react-redux";
import { likeArticles } from "../../../redux/getArticlesSlice";
import { likeArticle } from "../../../redux/getArticleSlice";
import { deleteArticle } from "../../../redux/deleteArticleSlice";
// Внутринние компоненты
import Button from "../button/button";
// Импорт ant design
import { Popconfirm } from "antd";

const Tag = ({ children, ...props }) => (
  <div className={cls["tags__tag"]} {...props}>
    {children}
  </div>
);

const InsidesArticle = ({ children, ...props }) => {
  // eslint-disable-next-line array-callback-return
  const tag = children.tagList.map((el) => {
    if (el.trim().length !== 0 || null)
      return <Tag key={el + Math.random()}>{el}</Tag>;
  });

  const history = useHistory();
  const { getSlug, resetStatusDeleteArticle } = useActions();

  const {
    authorization,
    like: llike,
    article,
    ...data
  } = useSelector((data) => data);
  const dispatch = useDispatch();

  const liked = () => {
    if (authorization.isAuth) {
      if (props.one) dispatch(likeArticle(children));
      dispatch(likeArticles(children));
    }
  };

  if (props.buttonEditDelite) {
    const articl = {
      title: article?.article?.title || "",
      description: article?.article?.description || "",
      body: article?.article?.body || "",
      tagList: article?.article?.tagList || "",
    };
    localStorage.setItem("article", JSON.stringify(articl));
  }

  if (data.deleteArticle.status) {
    setTimeout(() => {
      resetStatusDeleteArticle();
      history.push("/articles");
    }, 0);
  }

  return (
    <div className={cls.body}>
      <div className={cls.body__row}>
        <div className={cls.body__column}>
          <div className={cls.title}>
            <Link
              onClick={() => {
                getSlug(children.slug);
              }}
              to={`/articles/${children.slug}`}
            >
              {children.title}
            </Link>
            <span
              className={cls.title__like}
              style={authorization.isAuth && { cursor: "pointer" }}
              onClick={liked}
            >
              {!children.favorited ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_28_45)">
                    <path
                      d="M7.99998 15.1099C7.7722 15.1099 7.5526 15.0273 7.38146 14.8774C6.73509 14.3123 6.11193 13.7811 5.56212 13.3126L5.55932 13.3102C3.94738 11.9365 2.55542 10.7502 1.58691 9.58167C0.504272 8.27527 0 7.03662 0 5.68347C0 4.36877 0.450805 3.15588 1.26928 2.26807C2.09753 1.36975 3.234 0.875 4.46972 0.875C5.3933 0.875 6.23912 1.16699 6.98363 1.7428C7.35936 2.03345 7.69994 2.38916 7.99998 2.80408C8.30015 2.38916 8.64061 2.03345 9.01646 1.7428C9.76097 1.16699 10.6068 0.875 11.5304 0.875C12.766 0.875 13.9026 1.36975 14.7308 2.26807C15.5493 3.15588 16 4.36877 16 5.68347C16 7.03662 15.4958 8.27527 14.4132 9.58154C13.4447 10.7502 12.0528 11.9364 10.4411 13.3099C9.89036 13.7792 9.26622 14.3112 8.61839 14.8777C8.44737 15.0273 8.22765 15.1099 7.99998 15.1099ZM4.46972 1.81226C3.49889 1.81226 2.60705 2.19971 1.95825 2.90332C1.2998 3.61755 0.937132 4.60486 0.937132 5.68347C0.937132 6.82153 1.3601 7.83936 2.30847 8.98364C3.22509 10.0897 4.58849 11.2516 6.1671 12.5969L6.17003 12.5994C6.72191 13.0697 7.34752 13.6029 7.99864 14.1722C8.65367 13.6018 9.28026 13.0677 9.83323 12.5967C11.4117 11.2513 12.775 10.0897 13.6916 8.98364C14.6399 7.83936 15.0628 6.82153 15.0628 5.68347C15.0628 4.60486 14.7002 3.61755 14.0417 2.90332C13.393 2.19971 12.5011 1.81226 11.5304 1.81226C10.8192 1.81226 10.1662 2.03833 9.5897 2.48413C9.07591 2.88159 8.718 3.38403 8.50816 3.7356C8.40025 3.91638 8.21031 4.02429 7.99998 4.02429C7.78966 4.02429 7.59972 3.91638 7.49181 3.7356C7.28209 3.38403 6.92418 2.88159 6.41027 2.48413C5.83373 2.03833 5.18078 1.81226 4.46972 1.81226Z"
                      fill="black"
                      fillOpacity="0.75"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_28_45">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                >
                  <path
                    d="M8.00003 2.56924C7.26157 1.33847 6.0308 0.476929 4.55388 0.476929C2.46157 0.476929 0.861572 2.07693 0.861572 4.16924C0.861572 8.23077 3.07696 8.84616 8.00003 13.5231C12.9231 8.84616 15.1385 8.23077 15.1385 4.16924C15.1385 2.07693 13.5385 0.476929 11.4462 0.476929C9.96926 0.476929 8.73849 1.33847 8.00003 2.56924Z"
                    fill="#FF0707"
                  />
                </svg>
              )}
            </span>
            <span className={cls.title__like}>{children.favoritesCount}</span>
          </div>
          <div className={cls.tags}>{tag}</div>
          <div className={props.showMiniDescription ? cls.textmini : cls.text}>
            {children.description}
          </div>
        </div>
        <div className={cls.body__column}>
          <div className={cls.user}>
            <div>
              <div className={cls["user__name"]}>
                {children?.author?.username}
              </div>
              <div className={cls["user__date"]}>
                {format(
                  new Date(children.createdAt || "Опачки, даты нет"),
                  "MMMM dd, yyyy"
                )}
              </div>
              {props.buttonEditDelite ? (
                <div className={cls.btn}>
                  <Popconfirm
                    title="Are you sure to delete this article?"
                    // description="Are you sure to delete this article?"
                    onConfirm={() => dispatch(deleteArticle(children.slug))}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                    placement={"right"}
                  >
                    <Button className="btn btn_red">Delete</Button>
                  </Popconfirm>
                  <Link to={`/articles/${article.article.slug}/edit`}>
                    <Button className="btn btn_green">Edit</Button>
                  </Link>
                </div>
              ) : null}
            </div>
            <div className={cls["user__logo"]}>
              <img alt="logo" src={children.author.image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsidesArticle;
