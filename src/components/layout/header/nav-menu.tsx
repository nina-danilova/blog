import React from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

import { linkPaths } from 'utilities/constants';

import styles from './nav-menu.module.scss';

export const NavMenu: React.FC = () => {
  const { pathToSignIn, pathToSignUp } = linkPaths;
  return (
    <ul className={styles['nav-menu']}>
      <li className={styles['nav-menu-item']}>
        <Link
          to={pathToSignIn}
          className={styles['nav-menu-link']}
        >
          Sign In
        </Link>
      </li>
      <li className={styles['nav-menu-item']}>
        <Link
          to={pathToSignUp}
          className={clsx(styles['nav-menu-link'], styles['nav-menu-link--register'])}
        >
          Sign Up
        </Link>
      </li>
    </ul>
  );
};
