import React from 'react';

import { ArticleList } from 'components/blocks/article-list';
import { Pagination } from 'components/blocks/pagination';

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
