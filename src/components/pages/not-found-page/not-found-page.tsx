import React from 'react';

import styles from './not-found-page.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Page not found</h1>
      <p className={styles.description}>Sorry, but nothing found for your request :(</p>
    </>
  );
};
