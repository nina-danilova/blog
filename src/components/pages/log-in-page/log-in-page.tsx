import React from 'react';

import styles from './log-in-page.module.scss';
import { LogInForm } from './log-in-form';

export const LogInPage: React.FC = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Log In</h1>
      <LogInForm />
    </>
  );
};
