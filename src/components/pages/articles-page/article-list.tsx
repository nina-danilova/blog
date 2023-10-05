import React, { useEffect } from 'react';
import { Spin, Alert } from 'antd';
import { useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { loadArticles } from 'redux-toolkit/articles/articlesThunks';
import { linkPaths } from 'utilities/constants';

import styles from './article-list.module.scss';
import { ArticleCardPreview } from './article-card-preview';

export const ArticleList: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathToSignIn } = linkPaths;
  const currentPage = useAppSelector((state) => state.articles.currentPage);
  const articleList = useAppSelector((state) => state.articles.articleList);
  const isLoading = useAppSelector((state) => state.articles.loading);
  const loadArticlesError = useAppSelector((state) => state.articles.error);
  const loadSpinner = isLoading ? <Spin /> : null;
  const errorMessage =
    loadArticlesError !== null ? (
      <Alert
        type="error"
        closable={false}
        message="Article list loading error. Please update."
      />
    ) : null;
  const noDataMessage =
    !isLoading && articleList.length === 0 && loadArticlesError === null ? (
      <Alert
        type="info"
        closable={false}
        message="There is no relevant data for you. Please update."
      />
    ) : null;
  useEffect(() => {
    if (!isLoading) {
      dispatch(loadArticles({ currentPage }));
    }
  }, [currentPage]);
  useEffect(() => {
    if (
      loadArticlesError &&
      loadArticlesError.cause &&
      loadArticlesError.cause.errors &&
      loadArticlesError.cause.errors.error &&
      loadArticlesError.cause.errors.error.status &&
      loadArticlesError.cause.errors.error.status === 401
    ) {
      history.push(pathToSignIn);
    }
  }, [loadArticlesError]);
  return (
    <>
      {loadSpinner}
      {errorMessage}
      {noDataMessage}
      <ul className={styles['article-list']}>
        {articleList.map((article) => (
          <li key={`${article.slug}-${article.createdAt}`}>
            <ArticleCardPreview article={article} />
          </li>
        ))}
      </ul>
    </>
  );
};
