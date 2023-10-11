// Импорт стилей
import cls from "./signInPage.module.scss";
// Импорты react
import React from "react";
// Внутринние компоненты
import EntryField from "../UI/form/entryField/entryField";
import FormButton from "../UI/form/formButton/formButton";
import ErrorMessage from "../UI/form/errorMessage/errorMessage";
import { rulesEmail, rulesPassword } from "../UI/form/rulesForm/rulesForm";
// Импорты router
import { Link, useHistory } from "react-router-dom";
// Импорты react hook form
import { Controller, useForm } from "react-hook-form";
// Импорты redux
import { useSelector, useDispatch } from "react-redux";
import { authorizationUser } from "../../redux/postAuthorizationSlice";

const SignInPage = (props) => {
  const { authorization } = useSelector((data) => data);
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: JSON.parse(sessionStorage.getItem("Email")),
    },
  });

  const onSubmit = (data) => {
    const user = {
      user: {
        email: data.email.toLowerCase(),
        password: data.password,
      },
    };
    dispatch(authorizationUser(user));
  };

  if (authorization.status === "resolved") {
    localStorage.setItem("Token", JSON.stringify(authorization.token));
    localStorage.setItem("user", JSON.stringify(authorization));
    history.push("/articles");
  }

  return (
    <form className={cls.body} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span className={cls.title}>Sign In</span>
      </div>
      <div>
        <div className={cls.input}>
          <Controller
            name="email"
            control={control}
            rules={rulesEmail}
            render={({ field, fieldState: { error } }) => (
              <>
                <EntryField
                  {...field}
                  placeholder="Email address"
                  onError={error && true}
                >
                  Email address
                </EntryField>
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
              </>
            )}
          />
        </div>
        <div className={cls.input}>
          <Controller
            name="password"
            control={control}
            rules={rulesPassword}
            render={({ field, fieldState: { error } }) => (
              <>
                <EntryField
                  {...field}
                  placeholder="Password"
                  type="Password"
                  onError={error && true}
                >
                  Password
                </EntryField>
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
              </>
            )}
          />
        </div>
      </div>
      <div>
        {authorization.isError ? (
          <div className={cls.err}>
            Ошибка авторизации! Проверьте email и пороль
          </div>
        ) : null}
        <div className={cls.btn}>
          <FormButton dis={authorization.status === "pending"} type="submit">
            Login
          </FormButton>
        </div>
        <div className={cls.info}>
          Don’t have an account?
          <Link to="/sign-up" className={cls.link}>
            Sign Up.
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInPage;
