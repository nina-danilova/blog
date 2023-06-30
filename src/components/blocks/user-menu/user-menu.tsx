import React from 'react';

import { UserInfo } from '../user-info';

import styles from './user-menu.module.scss';

export const UserMenu = () => {
  return (
    <ul className={styles['user-menu']}>
      <li
        className={`${styles['user-menu-item']} ${styles['user-menu-item--create-article']}`}
      >
        Create article
      </li>
      <li className={styles['user-menu-item']}>
        <UserInfo />
      </li>
      <li className={`${styles['user-menu-item']} ${styles['user-menu-item--log-out']}`}>
        Log Out
      </li>
    </ul>
  );
};
