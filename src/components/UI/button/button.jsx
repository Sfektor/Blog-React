// Импорты react
import React from "react";
// Импорт стилей
import "./button.scss";
/*
Классы
btn - общий класс
btn_green - зеленая кнопка
btn_black - черная кнопка
btn_red - красная кнопка
btn_blue - голубая кнопка
*/

const Button = ({ children, ...props }) => {
  return (
    <>
      <button type="button" {...props}>
        {children}
      </button>
    </>
  );
};

export default Button;
