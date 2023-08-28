import React from 'react';

import { LogInForm } from 'components/blocks/log-in-form';

import styles from './log-in-page.module.scss';

export const LogInPage: React.FC = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Log In</h1>
      <LogInForm />
    </>
  );
};
