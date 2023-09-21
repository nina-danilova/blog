import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch } from 'hooks/hooks';
import { EditProfileForm } from 'components/blocks/edit-profile-form';
import { loadProfile } from 'redux-toolkit/profile/profileThunks';

import styles from './profile-page.module.scss';

export const ProfilePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadProfile({ history }));
  }, []);
  return (
    <>
      <h1 className={styles['visually-hidden']}>Blog - Profile page</h1>
      <EditProfileForm />
    </>
  );
};
