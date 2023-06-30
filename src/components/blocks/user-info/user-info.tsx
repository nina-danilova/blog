import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/reducers';

import styles from './user-info.module.scss';

export const UserInfo = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className={styles['user-info']}>
      <p className={styles['user-name']}>{user.userName}</p>
      <img
        src={user.userImage}
        className={styles['user-image']}
        width={46}
        height={46}
        alt="User"
      />
    </div>
  );
};
