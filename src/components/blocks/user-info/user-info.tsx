import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/reducers';

import styles from './user-info.module.scss';

export const UserInfo = () => {
  const { userName, image } = useSelector((state: RootState) => state.user.profile);
  const name = userName || '';
  const imageSrc = image || './img/icon-author-avatar.svg';
  return (
    <div className={styles['user-info']}>
      <p className={styles['user-name']}>
        <Link
          to="/profile"
          className={styles['user-name-link']}
        >
          {name}
        </Link>
      </p>
      <Link to="/profile">
        <img
          src={imageSrc}
          className={styles['user-image']}
          width={46}
          height={46}
          alt="User"
        />
      </Link>
    </div>
  );
};
