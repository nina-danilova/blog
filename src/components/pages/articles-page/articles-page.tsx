import React from 'react';

import styles from './articles-page.module.scss';
import { ArticleList } from './article-list';
import { Pagination } from './pagination';

export const ArticlesPage: React.FC = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Articles</h1>
      <ArticleList />
      <Pagination />
    </>
  );
};
