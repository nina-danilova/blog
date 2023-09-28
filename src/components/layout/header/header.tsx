import React from 'react';

import styles from './header.module.scss';
import { Navigation } from './navigation';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <p className={styles['site-title']}>Realworld Blog</p>
      <Navigation />
    </header>
  );
};
