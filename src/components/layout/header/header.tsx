import React from 'react';

import { Navigation } from '../../blocks/navigation';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <p className={styles['site-title']}>Realworld Blog</p>
      <Navigation />
    </header>
  );
};
