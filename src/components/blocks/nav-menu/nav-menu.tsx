import React from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

import styles from './nav-menu.module.scss';

export const NavMenu: React.FC = () => {
  return (
    <ul className={styles['nav-menu']}>
      <li className={styles['nav-menu-item']}>
        <Link
          to="/sign-in"
          className={styles['nav-menu-link']}
        >
          Sign In
        </Link>
      </li>
      <li className={styles['nav-menu-item']}>
        <Link
          to="/sign-up"
          className={clsx(styles['nav-menu-link'], styles['nav-menu-link--register'])}
        >
          Sign Up
        </Link>
      </li>
    </ul>
  );
};
