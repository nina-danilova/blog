import React from 'react';

import { ArticlesPage } from '../../pages/articles-page';

import styles from './main.module.scss';

export const Main = () => {
  return (
    <main className={styles.main}>
      <ArticlesPage />
    </main>
  );
};
