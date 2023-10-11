// Импорт стилей
import cls from "./formButton.module.scss";
// Импорты react
import React from "react";

function FormButton({ children, ...props }) {
  return (
    <div className={cls.body}>
      <button
        className={`${cls.btn} ${props.dis ? cls["btn_dis"] : ""}`}
        disabled={props.dis}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default FormButton;
