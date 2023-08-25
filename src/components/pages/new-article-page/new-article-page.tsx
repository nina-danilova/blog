import React from 'react';

import { ArticleForm } from 'components/blocks/article-form';

import styles from './new-article-page.module.scss';

export const NewArticlePage = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - New article</h1>
      <ArticleForm />
    </>
  );
};
