import React from 'react';

import { ArticleList } from '../../blocks/article-list';
import { Pagination } from '../../blocks/pagination';

import styles from './articles-page.module.scss';

export const ArticlesPage = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Articles</h1>
      <ArticleList />
      <Pagination />
    </>
  );
};
