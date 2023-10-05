// Импорт стилей
import cls from "./loaderSpiner.module.scss";
// Сторонние импорты
import { Hourglass } from "react-loader-spinner";

function LoaderSpiner() {
  return (
    <div className={cls.wrapper}>
      Загружаем данные...
      <Hourglass
        visible
        height="40"
        width="40"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
}

export default LoaderSpiner;
