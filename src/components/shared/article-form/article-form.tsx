import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import { Alert, Spin } from 'antd';
import { clsx } from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { createArticle, updateArticle } from 'redux-toolkit/article/articleThunks';
import { linkPaths } from 'utilities/constants';
import { addIdToTags } from 'utilities/tags';
import { getValidationResultErrorMessage } from 'utilities/errors';
import { clearArticle } from 'redux-toolkit/article/articleSlice';

import styles from './article-form.module.scss';
import { schema } from './articleFormSchema';
import { FormInput } from './form-input';
import { FormTextarea } from './form-textarea';
import { FormTagList } from './form-tag-list';

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
  isBlanc: boolean;
};

export const ArticleForm: React.FC<ArticleFormProps> = ({ isBlanc = false }) => {
  const history = useHistory();
  const { pathToHome } = linkPaths;
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.viewingArticle.isEditing);
  const formTitle = isEditing ? 'Edit article' : 'Create new article';
  const article = useAppSelector((state) => state.viewingArticle.article);
  const slug = useAppSelector((state) => state.viewingArticle.slug);
  const isLoading = useAppSelector((state) => state.viewingArticle.isLoading);
  const isSending = useAppSelector((state) => state.viewingArticle.isSending);
  const isUpdating = useAppSelector((state) => state.viewingArticle.isUpdating);

  const handleArticle: SubmitHandler<ArticleFormInput> = async (data, event) => {
    if (isLoading || isSending || isUpdating) {
      return;
    }
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
  const onChangeTag = (event: { target: { value: React.SetStateAction<string> } }) => {
    setTag(event.target.value);
  };
  const articleError = useAppSelector((state) => state.viewingArticle.error);
  const loadSpinner = isLoading || isSending || isUpdating ? <Spin /> : null;
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
    if (isBlanc) {
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
      <form
        className={styles['article-form']}
        onSubmit={onFormSubmit(handleArticle)}
      >
        <p className={styles['article-form-title']}>{formTitle}</p>
        <div className={styles['article-form-input-group']}>
          <FormInput
            labelName="Title"
            name="title"
            control={control}
            errorsObject={errors}
          />
          <FormInput
            labelName="Short description"
            name="description"
            control={control}
            errorsObject={errors}
          />
          <FormTextarea
            labelName="Text"
            name="body"
            control={control}
            errorsObject={errors}
            rowCount={7}
          />
          <div>
            <p className={styles['article-form-label-name']}>Tags</p>
            <div className={styles['article-form-tag-group']}>
              <ul className={styles['article-form-tag-list']}>
                <FormTagList
                  control={control}
                  errorsObject={errors}
                  fields={fields}
                  remove={remove}
                />
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
            disabled={isLoading || isSending || isUpdating}
          >
            Send
          </button>
        </div>
      </form>
      {loadSpinner}
      {errorMessage}
      {validationResultErrorMessage}
    </>
  );
};
