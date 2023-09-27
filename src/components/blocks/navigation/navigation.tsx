import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { NavMenu } from 'components/blocks/nav-menu';
import { UserMenu } from 'components/blocks/user-menu';
import { loadProfile } from 'redux-toolkit/profile/profileThunks';
import { getAuthStatus } from 'services/storage-service';
import { toggleAuth } from 'redux-toolkit/user/userSlice';
import { linkPaths } from 'utilities/constants';

export const Navigation: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathToSignIn } = linkPaths;
  const loadProfileError = useAppSelector((state) => state.profile.profileError);
  const isAuthorized = useAppSelector((state) => state.user.authorized);
  const isAuthorizedBeforeReload = getAuthStatus();
  if (!isAuthorized && isAuthorizedBeforeReload) {
    dispatch(toggleAuth());
    dispatch(loadProfile());
  }
  const navMenu = isAuthorized || isAuthorizedBeforeReload ? <UserMenu /> : <NavMenu />;
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
  return <nav>{navMenu}</nav>;
};
