import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'hooks/hooks';
import imageUrl from 'assets/icons/icon-author-avatar.svg';
import { linkPaths } from 'utilities/constants';

import styles from './user-info.module.scss';

export const UserInfo: React.FC = () => {
  const { pathToProfile } = linkPaths;
  const userName = useAppSelector((state) => state.profile.userName) || '';
  const image = useAppSelector((state) => state.profile.image) || imageUrl;
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
