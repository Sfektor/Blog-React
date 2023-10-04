// Импорт стилей
import cls from "./errorMessage.module.scss";
// Импорты react
import React from "react";

function ErrorMessage({ children }) {
  return <div className={cls.error}>{children}</div>;
}

export default ErrorMessage;
