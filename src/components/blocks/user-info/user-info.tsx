import React from 'react';
import { Link } from 'react-router-dom';

import styles from './user-info.module.scss';

export const UserInfo = () => {
  // const user = useSelector((state: RootState) => state.user);
  // const imageSrc = user.userImage ? user.userImage : './img/icon-author-avatar.svg';
  const userName = localStorage.getItem('lastUserName') ? localStorage.getItem('lastUserName') : null;
  const imageSrc =
    localStorage.getItem('lastUserImage') === ''
      ? localStorage.getItem('lastUserImage')
      : './img/icon-author-avatar.svg';
  return (
    <div className={styles['user-info']}>
      <p className={styles['user-name']}>
        <Link
          to="/profile"
          className={styles['user-name-link']}
        >
          {userName}
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
