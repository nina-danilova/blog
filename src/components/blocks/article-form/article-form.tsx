import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { store } from 'redux/store';
import { createArticle } from 'redux/action-creators/article';

import styles from './article-form.module.scss';

type ArticleFormInput = {
  title: string;
  description: string;
  text: string;
  tag1: string;
};

export const ArticleForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit: onFormSubmit,
  } = useForm<ArticleFormInput>();
  const history = useHistory();
  const createNewArticle: SubmitHandler<ArticleFormInput> = (data, event) =>
    store.dispatch(createArticle(event, history, data));
  // const error = useSelector((state: RootState) => state.user.loginError);
  /* const errorMessage = error ? (
    <Alert
      message={error}
      type="error"
    />
  ) : null; */
  return (
    <form
      className={styles['article-form']}
      onSubmit={onFormSubmit(createNewArticle)}
    >
      <p className={styles['article-form-title']}>Create new article</p>
      <div className={styles['article-form-input-group']}>
        <label
          htmlFor="title"
          className="article-form-label"
        >
          <p className={styles['article-form-label-name']}>Title</p>
          <input
            className={styles['article-form-input']}
            type="text"
            id="title"
            placeholder="Title"
            aria-invalid={errors.title ? 'true' : 'false'}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...register('title', {
              required: 'Field is required',
            })}
          />
          {errors.title?.type === 'required' && (
            <p
              role="alert"
              className={styles['article-form-error']}
            >
              {errors.title.message}
            </p>
          )}
        </label>
        <label
          htmlFor="description"
          className="article-form-label"
        >
          <p className={styles['article-form-label-name']}>Short description</p>
          <input
            className={styles['article-form-input']}
            type="text"
            id="description"
            placeholder="Description"
            aria-invalid={errors.description ? 'true' : 'false'}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...register('description', {
              required: 'Field is required',
            })}
          />
          {errors.description?.type === 'required' && (
            <p
              role="alert"
              className={styles['article-form-error']}
            >
              {errors.description.message}
            </p>
          )}
        </label>
        <label
          htmlFor="text"
          className="article-form-label"
        >
          <p className={styles['article-form-label-name']}>Text</p>
          <textarea
            className={styles['article-form-input']}
            id="text"
            placeholder="Text"
            rows={7}
            aria-invalid={errors.text ? 'true' : 'false'}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...register('text', {
              required: 'Field is required',
            })}
          />
          {errors.text?.type === 'required' && (
            <p
              role="alert"
              className={styles['article-form-error']}
            >
              {errors.text.message}
            </p>
          )}
        </label>
        <div className="article-form-label">
          <p className={styles['article-form-label-name']}>Tags</p>
          <div className={styles['article-form-tag-group']}>
            <ul className={styles['article-form-tag-list']}>
              <li key="1">
                <label
                  htmlFor="tag1"
                  className={styles['article-form-tag']}
                >
                  <p className={styles['visually-hidden']}>Tag 1</p>
                  <input
                    className={`${styles['article-form-input']} ${styles['article-form-input--tag']}`}
                    type="text"
                    id="tag1"
                    name="tag1"
                    placeholder="Tag"
                    maxLength={100}
                  />
                  <button
                    className={`${styles['article-form-tag-button']} ${styles['article-form-tag-button--delete']}`}
                    type="button"
                  >
                    Delete
                  </button>
                </label>
              </li>
            </ul>
            <button
              className={`${styles['article-form-tag-button']} ${styles['article-form-tag-button--add']}`}
              type="button"
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
  );
};
