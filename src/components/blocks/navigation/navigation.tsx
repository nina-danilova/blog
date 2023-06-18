import React from 'react';

import './navigation.module.scss';

export const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list nav-list">
        <li className="navigation__item nav-item">Sign In</li>
        <li className="navigation__item nav-item nav-item--positive">Sign Up</li>
      </ul>
    </nav>
  );
};
