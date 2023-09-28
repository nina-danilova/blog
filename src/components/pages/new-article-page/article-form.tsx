import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import { Alert } from 'antd';
import { clsx } from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { createArticle } from 'redux-toolkit/article/articleThunks';
import { messageRequired, messageTagMaxLength, messageTitleMaxLength } from 'utilities/constants';

import styles from './article-form.module.scss';

type Tag = {
  name: string;
};

type ArticleFormInput = {
  title: string;
  description: string;
  text: string;
  tags?: Tag[];
  'new-tag'?: string;
};

export const ArticleForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const createNewArticle: SubmitHandler<ArticleFormInput> = (data, event) =>
    dispatch(createArticle({ event, history, data }));
  const schema = yup.object().shape({
    title: yup.string().max(200, messageTitleMaxLength).required(messageRequired),
    description: yup.string().required(messageRequired),
    text: yup.string().required(messageRequired),
    tags: yup.array(
      yup.object().shape({
        name: yup.string().max(20, messageTagMaxLength).required(messageRequired),
      })
    ),
    'new-tag': yup.string(),
  });
  const {
    formState: { errors },
    handleSubmit: onFormSubmit,
    control,
  } = useForm<ArticleFormInput>({
    mode: 'onChange',
    resolver: yupResolver<ArticleFormInput>(schema),
  });
  const [tag, setTag] = useState('');
  const { fields, append, remove } = useFieldArray<ArticleFormInput, 'tags', 'id'>({
    control,
    name: 'tags',
  });
  const addTag = () => {
    if (tag) {
      append({ name: tag });
      setTag('');
    }
  };
  const clearTag = () => {
    setTag('');
  };
  const removeTag = (index: number) => () => {
    remove(index);
  };
  const onChangeTag = (event: { target: { value: React.SetStateAction<string> } }) => {
    setTag(event.target.value);
  };
  const error = useAppSelector((state) => state.user.userError);
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
                      <p className={styles['visually-hidden']}>{`tags.${index}`}</p>
                      <Controller
                        name={`tags.${index}.name` as const}
                        control={control}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <>
                              <input
                                className={clsx(styles['article-form-input'], styles['article-form-input--tag'])}
                                type="text"
                                placeholder="Tag"
                                value={value || ''}
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
                              {errors.tags?.[index] && (
                                <span className={styles['article-form-error']}>
                                  {errors.tags?.[index]?.name?.message}
                                </span>
                              )}
                            </>
                          );
                        }}
                      />
                    </label>
                  </li>
                ))}
                <li>
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
