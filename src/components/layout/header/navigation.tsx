import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { loadProfile } from 'redux-toolkit/profile/profileThunks';
import { hasAuthStatus } from 'services/storage-service';
import { toggleAuth } from 'redux-toolkit/user/userSlice';
import { linkPaths } from 'utilities/constants';
import { hasError401 } from 'utilities/errors';

import { NavMenu } from './nav-menu';
import { UserMenu } from './user-menu';

export const Navigation: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathToSignIn } = linkPaths;
  const loadProfileError = useAppSelector((state) => state.profile.error);
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  const isAuthorizedBeforeReload = hasAuthStatus();
  if (!isAuthorized && isAuthorizedBeforeReload) {
    dispatch(toggleAuth());
    dispatch(loadProfile());
  }
  const navMenu = isAuthorized || isAuthorizedBeforeReload ? <UserMenu /> : <NavMenu />;
  useEffect(() => {
    if (hasError401(loadProfileError)) {
      history.push(pathToSignIn);
    }
  }, [loadProfileError]);
  return <nav>{navMenu}</nav>;
};
