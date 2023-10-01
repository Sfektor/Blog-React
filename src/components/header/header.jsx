import React from "react";
import cls from "./header.module.scss";
import Button from "../UI/button/button";

const Header = (props) => {
  return (
    <div className={cls.body}>
      <div className={cls.body__row}>
        <div className={cls.body__column}>
          <a href="/#" className={cls.body__logo}>
            Realworld Blog
          </a>
        </div>
        <div className={cls.body__column}>
          <Button className="btn">Sign In</Button>
          <Button className="btn btn_green">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
