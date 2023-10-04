// Импорт стилей
import cls from "./signUpPage.module.scss";
// Импорты react
import React from "react";
// Внутринние компоненты
import EntryField from "../UI/form/entryField/entryField";
import FormButton from "../UI/form/formButton/formButton";
import ErrorMessage from "../UI/form/errorMessage/errorMessage";
import {
  rulesEmail,
  rulesPassword,
  rulesUsername,
} from "../UI/form/rulesForm/rulesForm";
import Modal from "../UI/modal/modal";
// Импорты router
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// Импорты react hook form
import { Controller, useForm } from "react-hook-form";
// Импорты redux
import { useSelector, useDispatch } from "react-redux";
import { regNewUser } from "../../redux/postRegistrationSlice";

function SignUpPage(props) {
  const { regisration } = useSelector((data) => data);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    handleSubmit,
    control,
    getValues,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const newUser = {
      user: {
        username: data.username.toLowerCase(),
        email: data.email.toLowerCase(),
        password: data.password,
      },
    };
    dispatch(regNewUser(newUser));
    reset();
  };

  if (regisration.status === "resolved") {
    localStorage.setItem("Token", JSON.stringify(regisration.token));
    sessionStorage.setItem("Email", JSON.stringify(regisration.email));
    setTimeout(() => {
      history.push("/sign-in");
    }, 5000);
  }

  return (
    <>
      <form className={cls.body} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span className={cls.title}>Create new account</span>
        </div>
        <div>
          <div className={cls.input}>
            <Controller
              name="username"
              control={control}
              rules={rulesUsername}
              render={({ field, fieldState: { error } }) => (
                <>
                  <EntryField
                    {...field}
                    placeholder="Username"
                    onError={error && true}
                  >
                    Username
                  </EntryField>
                  {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </>
              )}
            />
          </div>
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
          <div className={cls.input}>
            <Controller
              name="repeatPassword"
              control={control}
              rules={{
                validate: () =>
                  getValues("password") === getValues("repeatPassword"),
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <EntryField
                    {...field}
                    placeholder="Repeat Password"
                    type="Password"
                    onError={error && true}
                  >
                    Repeat Password
                  </EntryField>
                  {error && <ErrorMessage>Password doesn't match</ErrorMessage>}
                </>
              )}
            />
          </div>
        </div>
        <div className={cls.politic}>
          <input
            {...register("politic", { required: true })}
            type="checkbox"
            value="politic"
            className={`${cls["politic__checkbox"]} ${
              errors.politic && cls.err
            }`}
          />
          {errors.politic ? (
            <ErrorMessage>
              I agree to the processing of my personal information
            </ErrorMessage>
          ) : (
            <span className={cls["politic__text"]}>
              I agree to the processing of my personal information
            </span>
          )}
        </div>
        <div>
          {regisration.isError ? (
            <div className={cls.error}>
              Ошибка! Такой username или email уже занят
            </div>
          ) : null}
          <div className={cls.btn}>
            <FormButton type="submit">Create</FormButton>
          </div>

          <div className={cls.info}>
            Already have an account?
            <Link to="/sign-in" className={cls.link}>
              Sign In.
            </Link>
          </div>
        </div>
      </form>

      {regisration.status === "resolved" ? (
        <Modal visible>
          <p>Регистрация прошла успешно!</p>{" "}
          <p>
            Через 5 секунд вы будете перенесены на страницу авторизации. Или
            жмите на <Link to="/sign-in">SING IN</Link>
          </p>
        </Modal>
      ) : null}
    </>
  );
}

export default SignUpPage;
