import React from 'react';

import { ArticleForm } from 'components/shared/article-form';

import styles from './new-article-page.module.scss';

export const NewArticlePage: React.FC = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - New article</h1>
      <ArticleForm blanc />
    </>
  );
};
