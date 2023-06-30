import React from 'react';

import styles from './nav-menu.module.scss';

export const NavMenu = () => {
  return (
    <ul className={styles['nav-menu']}>
      <li className={styles['nav-menu-item']}>Sign In</li>
      <li className={`${styles['nav-menu-item']} ${styles['nav-menu-item--register']}`}>
        Sign Up
      </li>
    </ul>
  );
};
