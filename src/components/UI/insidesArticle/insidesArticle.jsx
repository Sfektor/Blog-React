// Импорт стилей
import cls from "./insidesArticle.module.scss";
// Внешние импорты
import { format } from "date-fns";
// Импорты redux
import { useActions } from "../../../hooks/useAction";
// Импорты router
import { Link } from "react-router-dom";

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
  const { getSlug } = useActions();

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
                {children.author.username}
              </div>
              <div className={cls["user__date"]}>
                {format(
                  new Date(children.createdAt || "Опачки, даты нет"),
                  "MMMM dd, yyyy"
                )}
              </div>
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
