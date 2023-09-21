import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { NavMenu } from 'components/blocks/nav-menu';
import { UserMenu } from 'components/blocks/user-menu';
import { loadProfile } from 'redux-toolkit/profile/profileThunks';
import { getFromStorage } from 'services/storage';
import { toggleAuth } from 'redux-toolkit/user/userSlice';

export const Navigation: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.user.authorized);
  if (!isAuthorized && getFromStorage('userAuthorized') === 'true') {
    dispatch(toggleAuth());
    dispatch(loadProfile({ history }));
  }
  const navMenu = isAuthorized || getFromStorage('userAuthorized') === 'true' ? <UserMenu /> : <NavMenu />;

  return <nav>{navMenu}</nav>;
};
