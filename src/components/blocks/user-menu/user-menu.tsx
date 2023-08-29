import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { UserInfo } from 'components/blocks/user-info';
import { store } from 'redux/store';
import { userLogOut } from 'redux/action-creators/user';

import { goToPage } from './utility';
import styles from './user-menu.module.scss';

export const UserMenu: React.FC = () => {
  const history = useHistory();
  const onLogOutButtonClick = () => {
    store.dispatch(userLogOut());
    goToPage('/', history);
  };
  return (
    <ul className={styles['user-menu']}>
      <li className={styles['user-menu-item']}>
        <Link
          to="/new-article"
          className={styles['create-article-button']}
        >
          Create article
        </Link>
      </li>
      <li className={styles['user-menu-item']}>
        <UserInfo />
      </li>
      <li className={styles['user-menu-item']}>
        <button
          type="button"
          className={styles['button-log-out']}
          onClick={onLogOutButtonClick}
        >
          Log Out
        </button>
      </li>
    </ul>
  );
};
