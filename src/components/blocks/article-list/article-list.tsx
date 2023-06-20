import React from 'react';

import { ArticleCard } from '../article-card';

import styles from './article-list.module.scss';

export const ArticleList = () => {
  return (
    <ul className={styles['article-list']}>
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </ul>
  );
};
