import React from 'react';
import { useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';

import { ArticleCard } from '../article-card';
import { RootState } from '../../../redux/reducers';
import { store } from '../../../redux/store';

import styles from './article-list.module.scss';

export const ArticleList = () => {
  const articleList = useSelector((state: RootState) => state.articles.articleList);
  const state = store.getState();
  const loadSpinner = state.articles.loading ? <Spin /> : null;
  const errorMessage =
    state.articles.error !== null ? (
      <Alert
        type="error"
        closable={false}
        message="Возникла ошибка при загрузке. Обновите страницу."
      />
    ) : null;
  return (
    <>
      {loadSpinner}
      {errorMessage}
      <ul className={styles['article-list']}>
        {articleList.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </>
  );
};
