import React from "react";
import cls from "./pagination.module.scss";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useAction";
import { Pagination as Pagi, ConfigProvider } from "antd";
import "./paginationAntd.css";

const Pagination = () => {
  const state = useSelector((state) => state.articles);
  const { getPage } = useActions();
  const getPageCount = (articlesCount, limit) => {
    return Math.ceil(articlesCount / limit - 1) * 10;
  };

  return (
    <div className={cls.body}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#fff",
          },
          components: {
            Pagination: {
              itemActiveBg: "#1890FF",
            },
          },
        }}
      >
        <Pagi
          total={getPageCount(state.articlesCount, 5)}
          current={state.page}
          showSizeChanger={false}
          onChange={getPage}
        />
      </ConfigProvider>
    </div>
  );
};

export default Pagination;
