import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAppDispatch } from 'hooks/hooks';
import { UserInfo } from 'components/blocks/user-info';
import { userLogOut } from 'redux-toolkit/user/userThunks';
import { linkPaths } from 'utilities/constants';
import { goToPage } from 'utilities/history';

import styles from './user-menu.module.scss';

export const UserMenu: React.FC = () => {
  const { pathToNewArticle } = linkPaths;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const onLogOutButtonClick = () => {
    dispatch(userLogOut());
    goToPage('/', history);
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
        >
          Log Out
        </button>
      </li>
    </ul>
  );
};
