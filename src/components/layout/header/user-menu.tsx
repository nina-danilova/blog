import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { userLogOut } from 'redux-toolkit/user/userThunks';
import { linkPaths } from 'utilities/constants';

import styles from './user-menu.module.scss';
import { UserInfo } from './user-info';

export const UserMenu: React.FC = () => {
  const { pathToNewArticle, pathToHome } = linkPaths;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isLoggingOut = useAppSelector((state) => state.user.isLoggingOut);
  const onLogOutButtonClick = () => {
    if (isLoggingOut) {
      return;
    }
    dispatch(userLogOut());
    history.push(pathToHome);
  };
  return (
    <ul className={styles['user-menu']}>
      <li className={styles['user-menu-item']}>
        <Link
          to={pathToNewArticle}
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
          disabled={isLoggingOut}
        >
          Log Out
        </button>
      </li>
    </ul>
  );
};
