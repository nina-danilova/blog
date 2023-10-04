import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { loadProfile } from 'redux-toolkit/profile/profileThunks';
import { linkPaths } from 'utilities/constants';

import styles from './profile-page.module.scss';
import { EditProfileForm } from './edit-profile-form';

export const ProfilePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathToSignIn } = linkPaths;
  const loadProfileError = useAppSelector((state) => state.profile.profileError);

  useEffect(() => {
    dispatch(loadProfile());
  }, []);
  useEffect(() => {
    if (
      loadProfileError &&
      loadProfileError.cause &&
      loadProfileError.cause.errors &&
      loadProfileError.cause.errors.error &&
      loadProfileError.cause.errors.error.status &&
      loadProfileError.cause.errors.error.status === 401
    ) {
      history.push(pathToSignIn);
    }
  }, [loadProfileError]);
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Profile page</h1>
      <EditProfileForm />
    </>
  );
};
