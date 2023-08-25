import React from 'react';

import { RegistrationForm } from 'components/blocks/registration-form';

import styles from './registration-page.module.scss';

export const RegistrationPage = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Log In</h1>
      <RegistrationForm />
    </>
  );
};
