import React from 'react';

import styles from './registration-page.module.scss';
import { RegistrationForm } from './registration-form';

export const RegistrationPage: React.FC = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Log In</h1>
      <RegistrationForm />
    </>
  );
};
