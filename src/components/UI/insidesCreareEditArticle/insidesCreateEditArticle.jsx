// Импорт стилей
import cls from "./insidesCreateEditArticle.module.scss";
// Импорты react
import React from "react";
// Внутренние импорты
import EntryField from "../form/entryField/entryField";
import Button from "../button/button";
import FormButton from "../form/formButton/formButton";
import ErrorMessage from "../../UI/form/errorMessage/errorMessage";
import Modal from "../modal/modal";
// Импорты react hook form
import { Controller, useForm, useFieldArray } from "react-hook-form";
// Импорты redux
import { useDispatch, useSelector } from "react-redux";
import { postArticle } from "../../../redux/postArticleSlice";
import { editArticle } from "../../../redux/putEditArticleSlice";
// Импорты router
import { useHistory } from "react-router-dom";
// свои хуки
import { useActions } from "../../../hooks/useAction";

const InsidesCreateEditArticle = (props) => {
  const { postArticle: article, ...data } = useSelector((data) => data);
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetStatusPostArticle, resetStatusEditArticle } = useActions();

  let articl;
  if (props.edit) {
    articl = JSON.parse(localStorage.getItem("article"));
  }

  const tegList = articl?.tagList.map((el) => ({ tag: el }));
  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: articl?.title || "",
      description: articl?.description || "",
      text: articl?.body || "",
      tags: tegList || "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control,
  });

  const onSubmit = (data) => {
    const tags = data.tags.map((el) => el.tag);
    const res = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: [...tags],
      },
    };
    const putRes = {
      res,
      slug: props.slug,
    };
    if (props.edit) dispatch(editArticle(putRes));
    else dispatch(postArticle(res));
  };

  if (article.status === "resolved" || data.editArticle.status === "resolved") {
    setTimeout(() => {
      resetStatusPostArticle();
      resetStatusEditArticle();
      history.push("/articles");
    }, 1000);
  }

  return (
    <>
      <form className={cls.body} onSubmit={handleSubmit(onSubmit)}>
        <div className={cls["input-text"]}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Required field" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <EntryField
                  {...field}
                  placeholder="Title"
                  onError={error && true}
                >
                  Title
                </EntryField>
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
              </>
            )}
          />
        </div>
        <div className={cls["input-text"]}>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Required field" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <EntryField
                  {...field}
                  placeholder="Description"
                  onError={error && true}
                >
                  Short description
                </EntryField>
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
              </>
            )}
          />
        </div>
        <div className={cls["input-text"]}>
          <Controller
            name="text"
            control={control}
            rules={{ required: "Required field" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <EntryField
                  textarea
                  {...field}
                  placeholder="Text"
                  onError={error && true}
                >
                  Text
                </EntryField>
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
              </>
            )}
          />
        </div>
        <div className={cls["inputs-btn-tags"]}>
          <div className={cls["inputs-btn-tags__tags"]}>
            {fields?.length ? (
              <div className={cls["inputs-btn-tags__title"]}>Tags</div>
            ) : null}
            {fields.map((field, index) => {
              return (
                <div className={cls["inputs-btn-tags__items"]} key={field.id}>
                  <Controller
                    name={`tags.${index}.tag`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <EntryField {...field} placeholder="Tag" />
                        <Button
                          className="btn btn_red"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  />
                </div>
              );
            })}
          </div>
          <Button className="btn btn_blue" onClick={() => append()}>
            Add tag
          </Button>
        </div>
        {article.isError ? (
          <ErrorMessage>
            Что-то пошло не так. Попробуйте создать статью позже
          </ErrorMessage>
        ) : null}
        <FormButton
          dis={
            article.status === "pending" ||
            data.editArticle.status === "pending"
          }
          style={{ width: "400px" }}
        >
          Send
        </FormButton>
      </form>

      {article.status === "resolved" ||
      data.editArticle.status === "resolved" ? (
        <Modal visible>
          <p>Статья готова!</p>
        </Modal>
      ) : null}
    </>
  );
};

export default InsidesCreateEditArticle;
