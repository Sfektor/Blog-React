// Внутринние компоненты
import InsidesArticle from "../UI/insidesArticle/insidesArticle";
// Импорты react
import React from "react";
// Импорты redux
import { useSelector } from "react-redux";

function ArticleCard() {
  const data = useSelector((state) => state.articles);

  const printArticle = data.articles.map((el) => {
    return (
      <InsidesArticle key={el.createdAt} showMiniDescription={true}>
        {el}
      </InsidesArticle>
    );
  });

  return <>{printArticle}</>;
}

export default ArticleCard;
