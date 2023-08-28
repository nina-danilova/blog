import React from 'react';

import { Navigation } from 'components/blocks/navigation';

import styles from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <p className={styles['site-title']}>Realworld Blog</p>
      <Navigation />
    </header>
  );
};
