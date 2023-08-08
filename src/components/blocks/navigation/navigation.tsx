import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/reducers';
import { NavMenu } from '../nav-menu';
import { UserMenu } from '../user-menu';
import { store } from '../../../redux/store';
import { userLoginSuccess } from '../../../redux/action-creators/user';

export const Navigation = () => {
  const isAuthorized = useSelector((state: RootState) => state.user.authorized);
  let result;
  if (!isAuthorized) {
    result = localStorage.getItem('userAuthorized') === 'true';
  }
  if (result) {
    const userInfo = {
      user: {
        userName: localStorage.getItem('lastUserName'),
        userImage: localStorage.getItem('lastUserImage'),
        userBio: localStorage.getItem('lastUserBio'),
      },
    };
    store.dispatch(userLoginSuccess(userInfo));
  }
  // eslint-disable-next-line no-nested-ternary
  const navMenu = isAuthorized ? <UserMenu /> : result ? <UserMenu /> : <NavMenu />;

  return <nav className="navigation">{navMenu}</nav>;
};
