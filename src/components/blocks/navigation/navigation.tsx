import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/reducers';
import { NavMenu } from '../nav-menu';
import { UserMenu } from '../user-menu';

export const Navigation = () => {
  const isAuthorized = useSelector((state: RootState) => state.user.authorized);
  const navMenu = isAuthorized ? <UserMenu /> : <NavMenu />;

  return <nav className="navigation">{navMenu}</nav>;
};
