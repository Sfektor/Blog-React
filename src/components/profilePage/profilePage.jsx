// Импорт стилей
import cls from "./profilePage.module.scss";
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
  rulesAvatar,
} from "../UI/form/rulesForm/rulesForm";
import Modal from "../UI/modal/modal";
// Импорты react hook form
import { Controller, useForm } from "react-hook-form";
// Импорты redux
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../redux/putEditUserSlice";
// Импорты router
import { useHistory, Link } from "react-router-dom";
// Собств. хуки
import { useActions } from "../../hooks/useAction";

function ProfilePage(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { edit } = useSelector((data) => data);
  const dispatch = useDispatch();
  const history = useHistory();
  const { getIsAuth, getIsEdit, getIsReg } = useActions();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: user?.userName,
      email: user?.email,
    },
  });

  const onSubmit = (data) => {
    const user = {
      user: {
        username: data?.username?.toLowerCase(),
        email: data?.email?.toLowerCase(),
        password: data?.password,
        bio: "I work at State Farm.",
        image: data?.avatar,
      },
    };
    dispatch(editUser(user));
  };

  if (edit?.status === "resolved") {
    setTimeout(() => {
      localStorage.clear();
      getIsAuth(JSON.parse(localStorage.getItem("user")));
      getIsEdit(JSON.parse(localStorage.getItem("user")));
      getIsReg(JSON.parse(localStorage.getItem("user")));
      sessionStorage.setItem("Email", JSON.stringify(edit.email));
      history.push("/sign-in");
    }, 5000);
  }

  return (
    <>
      <form className={cls.body} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span className={cls.title}>Edit Profile</span>
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
                    placeholder="New password"
                    type="Password"
                    onError={error && true}
                  >
                    New password
                  </EntryField>
                  {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </>
              )}
            />
          </div>
          <div className={cls.input}>
            <Controller
              name="avatar"
              control={control}
              rules={rulesAvatar}
              render={({ field, fieldState: { error } }) => (
                <>
                  <EntryField
                    {...field}
                    placeholder="Avatar image"
                    onError={error && true}
                  >
                    Avatar image (url)
                  </EntryField>
                  {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </>
              )}
            />
          </div>
        </div>
        <div>
          {edit?.isError ? (
            <div className={cls.err}>
              Ошибка! Проверьте данные и повторите попытку
            </div>
          ) : null}
          <div className={cls.btn}>
            <FormButton type="submit">Save</FormButton>
          </div>
        </div>
      </form>

      {edit?.status === "resolved" ? (
        <Modal visible>
          <p>Редактирование профиля прошло успешно!</p>{" "}
          <p>
            Через 5 секунд вы будете перенесены на страницу авторизации. Или
            жмите на <Link to="/sign-in">SING IN</Link>
          </p>
        </Modal>
      ) : null}
    </>
  );
}

export default ProfilePage;
