import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'antd';
import { clsx } from 'clsx';

import { RootState } from 'redux-toolkit/index';
import { createArticle } from 'redux-toolkit/article/articleThunks';
import { messageRequired, messageTagMaxLength, messageTitleMaxLength } from 'utilities/constants';

import styles from './article-form.module.scss';

type ArticleFormInput = {
  title: string;
  description: string;
  text: string;
};

export const ArticleForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const createNewArticle: SubmitHandler<ArticleFormInput> = (data, event) =>
    dispatch(createArticle({ event, history, data }));
  const {
    formState: { errors },
    handleSubmit: onFormSubmit,
    control,
    setValue,
  } = useForm<ArticleFormInput>({
    mode: 'onChange',
  });
  const [tag, setTag] = useState('');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });
  const addTag = () => {
    if (tag) {
      append({ [fields.length]: tag });
      setTag('');
    }
  };
  const clearTag = () => {
    setTag('');
  };
  const removeTag = (index) => () => {
    remove(index);
  };
  const onChangeTag = (event) => {
    setTag(event.target.value);
  };
  const error = useSelector((state: RootState) => state.user.loginError);
  const errorMessage = error ? (
    <Alert
      message={error.message}
      type="error"
    />
  ) : null;
  return (
    <>
      <form
        className={styles['article-form']}
        onSubmit={onFormSubmit(createNewArticle)}
      >
        <p className={styles['article-form-title']}>Create new article</p>
        <div className={styles['article-form-input-group']}>
          <label>
            <p className={styles['article-form-label-name']}>Title</p>
            <Controller
              name="title"
              control={control}
              rules={{
                required: messageRequired,
                maxLength: {
                  value: 300,
                  message: messageTitleMaxLength,
                },
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['article-form-input']}
                      type="text"
                      placeholder="Title"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.title && <p className={styles['article-form-error']}>{errors.title.message}</p>}
                  </>
                );
              }}
            />
          </label>
          <label>
            <p className={styles['article-form-label-name']}>Short description</p>
            <Controller
              name="description"
              control={control}
              rules={{
                required: messageRequired,
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['article-form-input']}
                      type="text"
                      placeholder="Description"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.description && (
                      <p className={styles['article-form-error']}>{errors.description.message}</p>
                    )}
                  </>
                );
              }}
            />
          </label>
          <label>
            <p className={styles['article-form-label-name']}>Text</p>
            <Controller
              name="text"
              control={control}
              rules={{
                required: messageRequired,
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <textarea
                      className={styles['article-form-input']}
                      placeholder="Text"
                      rows={7}
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.text && <p className={styles['article-form-error']}>{errors.text.message}</p>}
                  </>
                );
              }}
            />
          </label>
          <div>
            <p className={styles['article-form-label-name']}>Tags</p>
            <div className={styles['article-form-tag-group']}>
              <ul className={styles['article-form-tag-list']}>
                {fields.map((item, index) => (
                  <li key={item.id}>
                    <label className={styles['article-form-tag']}>
                      <p className={styles['visually-hidden']}>{`tag-${item.id}`}</p>
                      <Controller
                        name={`tag-${item.id}`}
                        control={control}
                        rules={{
                          required: messageRequired,
                          maxLength: {
                            value: 100,
                            message: messageTagMaxLength,
                          },
                        }}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <>
                              <input
                                className={clsx(styles['article-form-input'], styles['article-form-input--tag'])}
                                type="text"
                                placeholder="Tag"
                                value={value || setValue(`tag-${item.id}`, item[index])}
                                onChange={onChange}
                              />
                              <button
                                className={clsx(
                                  styles['article-form-tag-button'],
                                  styles['article-form-tag-button--delete']
                                )}
                                type="button"
                                onClick={removeTag(index)}
                              >
                                Delete
                              </button>
                              {errors[`tag-${item.id}`] && (
                                <span className={styles['article-form-error']}>{errors[`tag-${item.id}`].message}</span>
                              )}
                            </>
                          );
                        }}
                      />
                    </label>
                  </li>
                ))}
                <li key="new-tag">
                  <label className={styles['article-form-tag']}>
                    <p className={styles['visually-hidden']}>New tag</p>
                    <Controller
                      name="new-tag"
                      control={control}
                      render={() => {
                        return (
                          <>
                            <input
                              className={clsx(styles['article-form-input'], styles['article-form-input--tag'])}
                              type="text"
                              placeholder="Tag"
                              value={tag}
                              onChange={onChangeTag}
                            />
                            <button
                              className={clsx(
                                styles['article-form-tag-button'],
                                styles['article-form-tag-button--delete']
                              )}
                              type="button"
                              onClick={clearTag}
                            >
                              Delete
                            </button>
                          </>
                        );
                      }}
                    />
                  </label>
                </li>
              </ul>
              <button
                className={clsx(styles['article-form-tag-button'], styles['article-form-tag-button--add'])}
                type="button"
                onClick={addTag}
              >
                Add tag
              </button>
            </div>
          </div>
        </div>
        <div className={styles['article-form-actions']}>
          <button
            type="submit"
            className={styles['article-form-button']}
          >
            Send
          </button>
        </div>
      </form>
      {errorMessage}
    </>
  );
};
