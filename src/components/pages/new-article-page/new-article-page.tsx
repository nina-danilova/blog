import React from 'react';

import styles from './new-article-page.module.scss';
import { ArticleForm } from './article-form';

export const NewArticlePage: React.FC = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - New article</h1>
      <ArticleForm />
    </>
  );
};
