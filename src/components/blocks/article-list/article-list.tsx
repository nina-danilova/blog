import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';

import { ArticleCardPreview } from '../article-card-preview';
import { RootState } from '../../../redux/reducers';
import { getArticles } from '../../../redux/action-creators/articles';
import { store } from '../../../redux/store';

import styles from './article-list.module.scss';

export const ArticleList = () => {
  const currentPage = useSelector((state: RootState) => state.articles.currentPage);
  useEffect(() => {
    store.dispatch(getArticles(currentPage));
  }, [currentPage]);
  const articleList = useSelector((state: RootState) => state.articles.articleList);
  const isLoading = useSelector((state: RootState) => state.articles.loading);
  const loadArticlesError = useSelector((state: RootState) => state.articles.error);
  const loadSpinner = isLoading ? <Spin /> : null;
  const errorMessage =
    loadArticlesError !== null ? (
      <Alert
        type="error"
        closable={false}
        message="Loading error. Please update."
      />
    ) : null;
  const noDataMessage =
    !isLoading && articleList.length === 0 ? (
      <Alert
        type="info"
        closable={false}
        message="There is no relevant data for you. Please update."
      />
    ) : null;
  return (
    <>
      {loadSpinner}
      {errorMessage}
      {noDataMessage}
      <ul className={styles['article-list']}>
        {articleList.map((article) => (
          <li key={article.id}>
            <ArticleCardPreview article={article} />
          </li>
        ))}
      </ul>
    </>
  );
};
