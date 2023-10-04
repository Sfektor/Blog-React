// Импорт стилей
import cls from "./entryField.module.scss";
// Импорты react
import React from "react";

function EntryField({ children, ...props }) {
  return (
    <div className={cls.body}>
      <div className={cls.name}>{children}</div>
      <input
        {...props}
        className={`${cls.input} ${props.onError && cls["error-border"]}`}
      />
    </div>
  );
}

export default EntryField;
