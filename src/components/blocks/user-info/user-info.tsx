import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/reducers';
import imageUrl from 'assets/icons/icon-author-avatar.svg';
import { linkPaths } from 'utilities/constants';

import styles from './user-info.module.scss';

export const UserInfo: React.FC = () => {
  const { pathToProfile } = linkPaths;
  const userName = useSelector((state: RootState) => state.user.profile.userName) || '';
  const image = useSelector((state: RootState) => state.user.profile.image) || imageUrl;
  return (
    <div className={styles['user-info']}>
      <p className={styles['user-name']}>
        <Link
          to={pathToProfile}
          className={styles['user-name-link']}
        >
          {userName}
        </Link>
      </p>
      <Link to={pathToProfile}>
        <img
          src={image}
          className={styles['user-image']}
          width={46}
          height={46}
          alt="User"
        />
      </Link>
    </div>
  );
};
