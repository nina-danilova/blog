import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { EditProfileForm } from 'components/blocks/edit-profile-form';
import { loadProfile } from 'redux-toolkit/profile/profileThunks';

import styles from './profile-page.module.scss';

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProfile());
  });
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Profile page</h1>
      <EditProfileForm />
    </>
  );
};
