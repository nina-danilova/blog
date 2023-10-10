import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { loadProfile } from 'redux-toolkit/profile/profileThunks';
import { linkPaths } from 'utilities/constants';
import { hasError401 } from 'utilities/errors';

import styles from './profile-page.module.scss';
import { EditProfileForm } from './edit-profile-form';

export const ProfilePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathToSignIn } = linkPaths;
  const loadProfileError = useAppSelector((state) => state.profile.error);

  useEffect(() => {
    dispatch(loadProfile());
  }, []);
  useEffect(() => {
    if (hasError401(loadProfileError)) {
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
