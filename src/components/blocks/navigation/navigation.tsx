import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/reducers';
import { NavMenu } from 'components/blocks/nav-menu';
import { UserMenu } from 'components/blocks/user-menu';
import { store } from 'redux/store';
import { userLoginSuccess } from 'redux/action-creators/user';
import { loadProfile } from 'redux/action-creators/profile';

export const Navigation = () => {
  const isAuthorized = useSelector((state: RootState) => state.user.authorized);
  let result;
  if (!isAuthorized) {
    result = localStorage.getItem('userAuthorized') === 'true';
  }
  if (result) {
    store.dispatch(userLoginSuccess());
    store.dispatch(loadProfile());
  }
  // eslint-disable-next-line no-nested-ternary
  const navMenu = isAuthorized ? <UserMenu /> : result ? <UserMenu /> : <NavMenu />;

  return <nav className="navigation">{navMenu}</nav>;
};
