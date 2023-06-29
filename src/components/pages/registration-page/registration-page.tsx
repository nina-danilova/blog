import React from 'react';

import './registration-page.module.scss';
import styles from '../log-in-page/log-in-page.module.scss';
import { RegistrationForm } from '../../blocks/registration-form';

export const RegistrationPage = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Log In</h1>
      <RegistrationForm />
    </>
  );
};
