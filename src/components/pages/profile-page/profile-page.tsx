import React, { useEffect } from 'react';

import { store } from 'redux/store';
import { EditProfileForm } from 'components/blocks/edit-profile-form';
import { loadProfile } from 'redux/action-creators/profile';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
  useEffect(() => {
    store.dispatch(loadProfile());
  });
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Profile page</h1>
      <EditProfileForm />
    </>
  );
};
