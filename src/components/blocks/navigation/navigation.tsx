import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'redux-toolkit/index';
import { NavMenu } from 'components/blocks/nav-menu';
import { UserMenu } from 'components/blocks/user-menu';
import { loadProfile } from 'redux-toolkit/profile/profileThunks';
import { getFromStorage } from 'services/storage';
import { toggleAuth } from 'redux-toolkit/user/userSlice';

export const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state: RootState) => state.user.authorized);
  if (!isAuthorized && getFromStorage('userAuthorized') === 'true') {
    dispatch(toggleAuth());
    dispatch(loadProfile());
  }
  const navMenu = isAuthorized || getFromStorage('userAuthorized') === 'true' ? <UserMenu /> : <NavMenu />;

  return <nav>{navMenu}</nav>;
};
