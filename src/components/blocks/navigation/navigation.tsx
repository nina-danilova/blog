import React from 'react';

import styles from './navigation.module.scss';

export const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className={`navigation__list ${styles['nav-list']}`}>
        <li className={`navigation__item ${styles['nav-item']}`}>Sign In</li>
        <li className={`navigation__item ${styles['nav-item']} ${styles['nav-item--positive']}`}>Sign Up</li>
      </ul>
    </nav>
  );
};
