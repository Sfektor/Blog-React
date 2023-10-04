// Импорт стилей
import cls from "./header.module.scss";
// Импорты react
import React from "react";
// Внутринние компоненты
import Button from "../UI/button/button";
// Импорты router
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// Импорты redux
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useAction";

const Header = (props) => {
  const { authorization } = useSelector((data) => data);
  const { getIsAuth, getIsEdit, getIsReg } = useActions();
  const history = useHistory();

  return (
    <div className={cls.body}>
      <div className={cls.body__row}>
        <div className={cls.body__column}>
          <Link to="/" className={cls.body__logo}>
            Realworld Blog
          </Link>
        </div>
        <div className={cls.body__column}>
          {authorization.isAuth ? (
            <>
              <Button className="btn btn_green" style={{ padding: "5px 10px" }}>
                Create article
              </Button>
              <div className={cls.user}>
                <div className={cls["user__name"]}>
                  <Link to="/profile">{authorization.userName}</Link>
                </div>
                <div className={cls["user__logo"]}>
                  <Link to="/profile">
                    <img
                      alt="logo"
                      src={
                        authorization?.image
                          ? authorization?.image
                          : "https://i.pinimg.com/736x/73/ba/75/73ba7578d9be6778a0c2c14f26f5a1ab--opera-say-what.jpg"
                      }
                    />
                  </Link>
                </div>
              </div>
              <Button
                className="btn btn_black"
                onClick={() => {
                  localStorage.clear();
                  getIsAuth(JSON.parse(localStorage.getItem("user")));
                  getIsEdit(JSON.parse(localStorage.getItem("user")));
                  getIsReg(JSON.parse(localStorage.getItem("user")));
                  history.push("/articles");
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button className="btn">Sign In</Button>
              </Link>
              <Link to="/sign-up">
                <Button className="btn btn_green">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
