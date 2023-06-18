import React from 'react';

import { Navigation } from '../../blocks/navigation';

import './header.module.scss';

export const Header = () => {
  return (
    <header className="header">
      <p className="header__title site-title">Realworld Blog</p>
      <Navigation />
    </header>
  );
};
