import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/reducers';
import { NavMenu } from 'components/blocks/nav-menu';
import { UserMenu } from 'components/blocks/user-menu';
import { store } from 'redux/store';
import { userLoginSuccess } from 'redux/action-creators/user';
import { loadProfile } from 'redux/action-creators/profile';
import { getFromStorage } from 'services/storage';

export const Navigation: React.FC = () => {
  const isAuthorized = useSelector((state: RootState) => state.user.authorized);
  if (!isAuthorized && getFromStorage('userAuthorized') === 'true') {
    store.dispatch(userLoginSuccess());
    store.dispatch(loadProfile());
  }
  const navMenu = isAuthorized || getFromStorage('userAuthorized') === 'true' ? <UserMenu /> : <NavMenu />;

  return <nav>{navMenu}</nav>;
};
