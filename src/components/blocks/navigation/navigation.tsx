import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { NavMenu } from 'components/blocks/nav-menu';
import { UserMenu } from 'components/blocks/user-menu';
import { loadProfile } from 'redux-toolkit/profile/profileThunks';
import { getAuthStatus } from 'services/storage-service';
import { toggleAuth } from 'redux-toolkit/user/userSlice';

export const Navigation: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.user.authorized);
  const isAuthorizedBeforeReload = getAuthStatus();
  if (!isAuthorized && isAuthorizedBeforeReload) {
    dispatch(toggleAuth());
    dispatch(loadProfile({ history }));
  }
  const navMenu = isAuthorized || isAuthorizedBeforeReload ? <UserMenu /> : <NavMenu />;

  return <nav>{navMenu}</nav>;
};
