import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import { Alert, Spin } from 'antd';
import { clsx } from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { createArticle, updateArticle } from 'redux-toolkit/article/articleThunks';
import { linkPaths, messageRequired, messageTagMaxLength, messageTitleMaxLength } from 'utilities/constants';
import { addIdToTags } from 'utilities/tags';
import { getValidationResultErrorMessage } from 'utilities/errors';
import { clearArticle } from 'redux-toolkit/article/articleSlice';

import styles from './article-form.module.scss';

export type Tag = {
  name: string;
};

export type ArticleFormInput = {
  title: string;
  description: string;
  body: string;
  tags?: Tag[];
  'new-tag'?: string;
};

type ArticleFormProps = {
  blanc: boolean;
};

export const ArticleForm: React.FC<ArticleFormProps> = ({ blanc = false }) => {
  const history = useHistory();
  const { pathToHome } = linkPaths;
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.viewingArticle.editing);
  const formTitle = isEditing ? 'Edit article' : 'Create new article';
  const article = useAppSelector((state) => state.viewingArticle.article);
  const slug = useAppSelector((state) => state.viewingArticle.slug);
  const handleArticle: SubmitHandler<ArticleFormInput> = async (data, event) => {
    event?.preventDefault();
    if (isEditing && slug) {
      const result = await dispatch(updateArticle({ slug, data }));
      if (result.type.endsWith('fulfilled')) {
        history.push(pathToHome);
      }
    } else {
      const result = await dispatch(createArticle({ data }));
      if (result.type.endsWith('fulfilled')) {
        history.push(pathToHome);
      }
    }
  };
  const schema = yup.object().shape({
    title: yup.string().max(200, messageTitleMaxLength).required(messageRequired),
    description: yup.string().required(messageRequired),
    body: yup.string().required(messageRequired),
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
    setValue,
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
  const isLoading = useAppSelector((state) => state.viewingArticle.loading);
  const isUpdating = useAppSelector((state) => state.viewingArticle.updating);
  const articleError = useAppSelector((state) => state.viewingArticle.error);
  const loadSpinner = isLoading || isUpdating ? <Spin /> : null;
  const errorMessage = articleError ? (
    <Alert
      message={articleError.message}
      type="error"
    />
  ) : null;
  const validationResultErrorMessage =
    articleError && getValidationResultErrorMessage(articleError) ? (
      <Alert message={getValidationResultErrorMessage(articleError)} />
    ) : null;
  useEffect(() => {
    if (blanc) {
      dispatch(clearArticle());
    } else if (article) {
      const tags = addIdToTags(article.tagList);
      setValue('title', article.title);
      setValue('description', article.description);
      setValue('body', article.body);
      setValue('tags', tags);
    }
  }, [article]);
  return (
    <>
      {loadSpinner}
      <form
        className={styles['article-form']}
        onSubmit={onFormSubmit(handleArticle)}
      >
        <p className={styles['article-form-title']}>{formTitle}</p>
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
                      className={clsx(styles['article-form-input'], {
                        [styles['article-form-input--invalid']]: !!errors.title,
                      })}
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
                      className={clsx(styles['article-form-input'], {
                        [styles['article-form-input--invalid']]: !!errors.description,
                      })}
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
              name="body"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <textarea
                      className={clsx(styles['article-form-input'], {
                        [styles['article-form-input--invalid']]: !!errors.body,
                      })}
                      placeholder="Text"
                      rows={7}
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.body && <p className={styles['article-form-error']}>{errors.body.message}</p>}
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
                                className={clsx(styles['article-form-input'], styles['article-form-input--tag'], {
                                  [styles['article-form-input--invalid']]: !!errors.tags,
                                })}
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
      {validationResultErrorMessage}
    </>
  );
};
