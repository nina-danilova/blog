import React from 'react';

import { EditProfileForm } from '../../blocks/edit-profile-form';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Profile page</h1>
      <EditProfileForm />
    </>
  );
};
