import React, { useEffect, useState } from "react";
import cls from "./pagination.module.scss";
import { useSelector } from "react-redux";
import { getPageCount, getPageArray } from "../../utils/pagination";
import { useActions } from "../../hooks/useAction";

const Pagination = () => {
  const state = useSelector((state) => state.articles);

  const allPage = getPageCount(state.articlesCount, state.articles.length);
  const pageArray = getPageArray(allPage);
  const [pageActive, setPageActive] = useState(state.page);
  const { getPage } = useActions();

  useEffect(() => {
    getPage(pageActive);
  }, [getPage, pageActive]);

  const leftArrow = () => {
    return (
      <span>
        <button
          href="/#"
          className={`${cls["body__arrow-prev"]} ${
            pageActive === 1 ? "" : cls["body__arrow-active"]
          }`}
          onClick={() => {
            if (pageActive === 1) return;
            setPageActive(pageActive - 1);
          }}
        >
          ˂
        </button>
      </span>
    );
  };
  const rightArrow = () => {
    return (
      <span>
        <button
          href="/#"
          className={`${cls["body__arrow-next"]} ${
            pageActive === allPage ? "" : cls["body__arrow-active"]
          }`}
          onClick={() => {
            if (pageActive === allPage) return;
            setPageActive(pageActive + 1);
          }}
        >
          ˃
        </button>
      </span>
    );
  };
  const pageNumber = pageArray.map((el) => (
    <span key={el}>
      <button
        onClick={() => setPageActive(el)}
        href="/#"
        className={`${cls["body__num"]} ${
          el === pageActive ? cls["body__num-active"] : ""
        }`}
      >
        {el}
      </button>
    </span>
  ));

  return (
    <div className={cls.body}>
      {leftArrow()}
      {pageNumber}
      {rightArrow()}
    </div>
  );
};

export default Pagination;
