import React from 'react';
import { useSelector } from 'react-redux';

import { store } from '../../../redux/store';
import { EditProfileForm } from '../../blocks/edit-profile-form';
import { loadProfileStart, loadProfileSuccess, loadProfileError } from '../../../redux/action-creators/profile';
import { RootState } from '../../../redux/reducers';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
  const userName = useSelector((state: RootState) => state.user.profile?.userName);
  const loadingProfile = useSelector((state: RootState) => state.user.profile?.loadingProfile);
  if (!loadingProfile && !userName && userName !== '') {
    store.dispatch(loadProfileStart());
  }
  if (loadingProfile && !userName) {
    store.dispatch(
      loadProfileSuccess({
        user: {
          userName: 'json.user.userName',
          email: 'json.user.email',
          bio: 'json.user.bio',
          image: 'json.user.image',
        },
      })
    );
  }
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Profile page</h1>
      <EditProfileForm />
    </>
  );
};
