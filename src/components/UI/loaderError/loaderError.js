import cls from "./loaderError.module.scss";

const LoaderError = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.text}>
        И как ты умудрился всё сломать? Ладно, зайди позже, скоро починим
      </div>
    </div>
  );
};

export default LoaderError;
