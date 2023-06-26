import React from 'react';

import { store } from '../../../redux/store';
import { ArticleList } from '../../blocks/article-list';
import { Pagination } from '../../blocks/pagination';
import { getArticles } from '../../../redux/action-creators/articles';

import styles from './articles-page.module.scss';

export const ArticlesPage = () => {
  const state = store.getState();
  const currentPageForArticles = state.articles.currentPage;
  store.dispatch(getArticles(currentPageForArticles));
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Articles</h1>
      <ArticleList />
      <Pagination />
    </>
  );
};
